const fs = require('fs')
const { execSync } = require('child_process')
const { exit } = require('process')

async function setupContainers (test) {
  await new Promise((resolve) => {
    console.log('looking for docker...')
    execSync('docker --version')
    resolve()
  }).then(() => {
    console.log('you have docker installed. proceeding...')
  }).catch(() => {
    console.log("seems like you don't have docker installed.")
    exit(-1)
  })

  await new Promise((resolve) => {
    console.log('building source image...')
    execSync('docker build -t chitchat_source:1.0.0 ./source', { stdio: 'inherit' })
    resolve()
  }).then(() => {
    console.log('source image was built successfully. proceeding to server image...')
  }).catch(() => {
    console.log('process failed while trying to build image for source.')
    exit(-1)
  })

  await new Promise((resolve) => {
    console.log('building server image...')
    execSync('docker build -t chitchat_server:1.0.0 ./server', { stdio: 'inherit' })
    resolve()
  }).then(() => {
    console.log('server image was built successfully.')
  }).catch(() => {
    console.log('process failed while trying to build image for server.')
    exit(-1)
  })

  if (test) {
    await new Promise((resolve) => {
      console.log('building test image...')
      execSync('docker build -f "./source/dockerfile.e2e" -t "chitchat_e2e:1.0.0" ./source', { stdio: 'inherit' })
      execSync('docker build -f "./source/dockerfile.ut" -t "chitchat_source_unit_tests:1.0.0" ./source', { stdio: 'inherit' })
      resolve()
    }).then(() => {
      console.log('test images were built successfully.')
    }).catch(() => {
      console.log('process failed while trying to build images for tests.')
      exit(-1)
    })
  }

  let retry = false
  // const flag = test ? '-f test-compose.yml' : ''

  await new Promise((resolve) => {
    console.log('starting containers')

    if(test){
      const e2e = 'docker-compose -f test-compose.yml run e2e_tests'
      execSync(e2e, { stdio: 'inherit' })
      const sourceUnitTests = 'docker-compose -f test-compose.yml run source_unit_tests'
      execSync(sourceUnitTests, { stdio: 'inherit' })
    }else {
      const command = 'docker-compose up'
      execSync(command, { stdio: 'inherit' })
    }
    resolve()
  }).then(() => {
    console.log(test ? 'tests finished successfully.' : 'server is up and running!')
  }).catch(() => {
    console.log('there was a problem ', test ? "running tests." : "starting compose service. Retrying with docker compose")
    retry = true
  })

  if (retry) {
    await new Promise((resolve) => {
      if(test){
        const e2e = 'docker compose -f test-compose.yml run e2e_tests'
        execSync(e2e, { stdio: 'inherit' })
        const sourceUnitTests = 'docker compose -f test-compose.yml run source_unit_tests'
        execSync(sourceUnitTests, { stdio: 'inherit' })
      }else {
        const command = 'docker compose up'
        execSync(command, { stdio: 'inherit' })
      }
      resolve()
    }).then(() => {
      console.log(test ? 'tests finished successfully.' : 'server is up and running!')
    }).catch(() => {
      console.log('there was a problem ', test ? "running tests." : "starting compose service.")
      exit(-1)
    })
  }
}

function writeFile (content, file) {
  if (file.type === 'source') {
    const prefix = process.platform === 'win32' ? 'powershell.exe ' : ''
    try {
      execSync('cd ./source/src/environments')
    } catch (error) {
      const mkdir = prefix + 'mkdir ./source/src/environments'
      execSync(mkdir)
    }
  }

  const path = file.type === 'source' ? `./source/src/environments/${file.fileName}` : './server/.env'
  return new Promise((resolve, reject) => {
    fs.writeFileSync(path, content, () => {})
    resolve()
  }).catch(e => { console.log(e) })
}

async function fetchFileInfo (file, pat) {
  return fetch(`https://raw.githubusercontent.com/c-chat/chitchat-env/main/${file.fileName}`, {
    headers: {
      Authorization: `token ${pat}`
    }
  })
    .then(res => {
      if (res.ok) {
        return res.text()
      }
      // console.log(res.status, res.statusText);
      throw Error(`${res.status} ${res.statusText} something went wrong. script was unable to fetch requested resources. env file was not updated`)
    })
    .then(async (content) => {
      await writeFile(content, file)
    })
    .catch(e => { console.log(e) })
}

async function main (pat, test) {
  const FILES = [{ type: 'source', fileName: 'environment.ts' }, { type: 'source', fileName: 'environment.development.ts' }, { type: 'server', fileName: '.server.env' }]
  for (const file of FILES) {
    await fetchFileInfo(file, pat)
  }
  setupContainers(test)
}

const PAT = process.argv[2]
const mode = process.argv[3]
const test = mode === 'test'
if (!PAT) {
  console.error('personal access token was not provided.')
  exit(-1)
}

main(PAT, test)

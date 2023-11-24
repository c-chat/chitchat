const fs = require('fs')
const { execSync } = require('child_process')
const { exit } = require('process')

async function setupContainers () {
  await new Promise((resolve) => {
    console.log("looking for docker...")
    execSync('docker --version')
    resolve()
  }).then(() => {
    console.log('you have docker installed. proceeding...')
  }).catch(() => {
    console.log("seems like you don't have docker installed.")
    exit(-1)
  })


  await new Promise((resolve) => {
    console.log("building source image...")
    execSync('docker build -t chitchat_source:1.0.0 ./source',{stdio: 'inherit'})
    resolve()
  }).then(() => {
    console.log("source image was built successfully. proceeding to server image...");
  }).catch(() => {
    console.log("process failed while trying to build image for source.");
    exit(-1)
  })

  await new Promise((resolve) => {
    console.log("building server image...")
    execSync('docker build -t chitchat_server:1.0.0 ./server',{stdio: 'inherit'})
    resolve()
  }).then(() => {
    console.log("server image was built successfully.");
  }).catch(() => {
    console.log("process failed while trying to build image for server.");
    exit(-1)
  })

  let retry = false
  await new Promise((resolve) => {
    console.log("starting containers...")
    execSync('docker-compose up',{stdio: 'inherit'})
    resolve()
  }).then(() => {
      console.log("server is up and running!")
  }).catch(() => {
      console.log("docker-compose failed. retrying with docker compose...")
      retry = true
  })

  if (retry) {
    await new Promise((resolve) => {
      execSync('docker compose up',{stdio: 'inherit'})
      resolve()
    }).then(() => {
      console.log("server is up and running!")
    }).catch(() => {
      console.log("seems like there is a problem with your docker compose package. process failed.");
      exit(-1)
    })
  }

}

function writeFile (content, file) {
  if (file.type === "source") {
    try {
      execSync("cd ./source/src/environments")
    } catch (error) {
      execSync("mkdir ./source/src/environments")
    }
  }

  console.log(content);
  const path = file.type === "source" ? `./source/src/environments/${file.fileName}` : `./server/.env`
  return new Promise((res, rej) => {
    fs.writeFileSync(path, content, () => {})
    res()
  }).catch(e =>{console.log(e);})
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
    .then(async(content) => {
      await writeFile(content, file)
    })
    .catch(e => { console.log(e) })
}

async function main (pat) {
  const FILES = [{type:'source',fileName:'environment.ts'},{type:'source',fileName:'environment.development.ts'}, {type:'server',fileName:'.server.env'}]
  for (const file of FILES) {
    await fetchFileInfo(file, pat)
  }
  setupContainers()
}

const PAT = process.argv[2]
if (!PAT) {
  console.error("personal access token was not provided.");
  exit(-1);
}

main(PAT)
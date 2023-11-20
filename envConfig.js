const fs = require('fs');


function writeFile(content, fileName){
	const path = fileName.split('.')[1];
    fs.writeFileSync(`./${path}/${fileName}`, content);
}

function fetchFileInfo(fileName, pat){
    fetch(`https://raw.githubusercontent.com/c-chat/chitchat-env/main/${fileName}`,{
        headers: {
            'Authorization': `token ${pat}`
        }
    })
    .then(res => {
        if (res.ok) {
            return res.text();
        }
        throw Error('something went wrong. script was unable to fetch requested resources. env file was not updated')
    })
    .then((content) => writeFile(content, fileName))
    .catch(e => {console.error(e.message);});
}

function main(pat) {
    const FILES = ['.source.env', '.server.env'];
    for (const file of FILES) {
        fetchFileInfo(file, pat);
    }
}

main(process.argv[2]);

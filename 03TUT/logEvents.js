const {format} = require('date-fns');
const { v4: uuid } = require('uuid'); //specific version

//common core modules
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem =   `${dateTime}\t${uuid()}\t${message}\t`;
    console.log(logItem);
    try{
        if(!fs.existsSync(path.join(__dirname, 'logs'))){
            await fsPromises.mkdir(path.join(__dirname,'logs'));
        }
        //test 
        await fsPromises.appendFile(path.join(__dirname,'logs',logName), logItem);
    }catch(err){
        console.log(err);
    }
}

module.exports = logEvents; //exporting log event function and using in index.js

/**
 * list of cmd :
 * 
(project root) => sudo npm i nodemon -g
(folder root) => nodemon
(initialize the npm) =< npm init
(install locally) => sudo npm i date-fns
(dev dependency install) => sudo npm i nodemon -D
(for script-package json) => npm run dev
(for installing package) => sudo npm i uuid
(for specific package install) => sudo npm i nodemon@versionName
(for updates) => sudo npm update : it checks for updates
(for unintall) => npm rm packageName -D | -g : depending upon devdependencies or global : don't forget to check scripts in package jdon

*/
const {format} = require('date-fns');
const { v4: uuid } = require('uuid'); //specific version

console.log(format(new Date(),'yyyyMMdd\tHH:mm:ss'));

console.log(uuid()); //logs diff id 
/**
 * globally
 * */
//cmd : npm i (install or add) nodemon (monitors the files and restarts the se4rver, no need to write 'node' everytime) intall in the project root::: sudo npm i nodemon -g
//nodemon : looks out for index js file, else nodemon filename
//resytarts whenever we change or make any issues

/**
 * 
 * locally to the project
 * 
 */

//initialize npm : npm init
//it creates package.json : this file will know what packages to install for the app(hosted and built, build commands just installs it), if we have github, using this file, we won't have to send as much data (as a node package has)
//asks the following set of questions
/***
 * 
 * 
 * 
package name: (03tut) 
version: (1.0.0) 
description: 
entry point: (index.js) 
test command: 
git repository: 
keywords: 
author: 
license: (ISC) 
About to write to /Applications/XAMPP/xamppfiles/htdocs/nodeJs/03TUT/package.json:

{
  "name": "03tut",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


Is this OK? (yes) */
//download the package => sudo npm i date-fns
/***
 * 
 * 
this add dependencies to the package.json and adds node_module folders for the package too,
and whenever the project is build , we will know this package is the part of the app
production dependencies
*/
//to remove node modules from git uppload : we add .gitignore file
//add the file to : root of the folder you are in

//adding dev dependencies : for packages that are needed only during development not in prod
/**
 * sudo npm i nodemon -D
 * 
 */

//SCript : package.json 
/**
 * types of scripts : start, dev, built and test
 * inside package.json : replace the script type and mention the command inside it
 * 
 * then run the cmd : npm run dev : it will run the cmd script from package.json, with "dev" being from "scripts" tag and running "index" file
 * 
 */

//UUID: creates diff id for each entry
/**
 * 
 * package.json has :  "uuid": "^10.0.0"
 * console logs : ede766bd-ca35-46ad-897f-f4ea9a88d17f
 */


//versions in devdependencies and dependencies
/**
 * 
 * inside package.json : "packageName" : "^10.1.2."
 * "10" : major version, "1" : minor version,  "2" : patch
 * "^" : updates the minor and patch only
 * "~" : update only the patch
 * "*" : update anything or everything
 * 
 */


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
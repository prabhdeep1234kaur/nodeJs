/**
 * 
 * IMPORTING MODULES
 * 
 */

//importing common Core module : using commonJS
const fsPromises = require('fs').promises; 

//fs.promises API is a set of asynchronous file system methods that return promises, making it easier to work with asynchronous code using async and await.


const path = require('path'); //path module: preventing hard coding of the file path

/**
 * 
 * READ, WRITE and APPEND but CALLBACK HANDLED :  callback hell
 * 
 */

const fileOps = async() => {
    try{
        const data  = await fsPromises.readFile(path.join(__dirname, 'files','loaderFile.txt'), 'utf8');
        console.log(data);

        //DELETE FILE
        //await fsPromises.unlink(path.join(__dirname, 'files','loaderFile.txt'));


        await fsPromises.writeFile(path.join(__dirname, 'files','promiseWrite.txt'), data);

        await fsPromises.appendFile(path.join(__dirname, 'files','promiseWrite.txt'), 'This is appended!\n\n it feels good to learn node');

        await fsPromises.rename(path.join(__dirname, 'files','promiseWrite.txt'),path.join(__dirname, 'files','promiseRename.txt'));


        //reading new file

        const newData  = await fsPromises.readFile(path.join(__dirname, 'files','promiseRename.txt'), 'utf8');
        console.log(newData);

    }catch(err){
        console.log(err);
    }
}

fileOps();


/**
 * 
 * ERROR HANDLING
 * 
 */
//process : node already has the value, we dont need to import it
//for uncaught errors : from the node documentation
process.on('uncaughtException', err =>{
    console.log("There was an error : "+err );
    process.exit(1);
})
/**
 * 
 * IMPORTING MODULES
 * 
 */

//importing common Core module : using commonJS
const fs = require('fs');
const path = require('path'); //path module: preventing hard coding of the file path


/**
 * READ FILE
 */
//fs.readFile('./files/sample.txt','utf8',(err, data)=>{
fs.readFile(path.join(__dirname, 'files','sample.txt'), 'utf8', (err, data)=>{    
    if(err) throw err;
    //console.log(data); //loads buffer data, outputs : <Buffer 48 65 6c 6c 6f 2c 20 73 61 6d 70 6c 65 20 66 69 6c 65 2e>
    //console.log(data.toString()); //loads string data
    console.log(data); //we added utf8 ; no need string
});

/**
 * 
 * FOR ASYNC 
 * 
 */
//prints this first : why? : node tackles the issues while processing the other tasks : async wait
console.log('hello...');

/**
 *  WRITE FILE
 * no  need of utf8, it is by default
 * no data in call back, only err
 * pathname,content to write, callback
 */ 

fs.writeFile(path.join(__dirname, 'files', 'newWriteFile.txt'), 'This file is created just now!', (err)=>{
    if(err) throw err;
    console.log("Writing complete");


    //APPEND AFTER WRITING THE FILE
    fs.appendFile(path.join(__dirname,'files','newWriteFile.txt'),'\n\nAppended to the file',(err)=>{
        if(err) throw err;
        console.log('Appending complete');

        //RENAME AFTER APPENDING THE CONTENT TO FILE
        //OTHER append work like renaming the file etc, that needs to be in sync series too

        fs.rename(path.join(__dirname,'files','newWriteFile.txt'), path.join(__dirname,'files','renamedWriteFile.txt'),(err)=>{
            if(err) throw err;
            console.log("Renaming done");
        })
    })
});

/**
 *  APPEND TO FILE
 * 
 * creates a file if it doesnt exist before
 * 
 * ASNYC nature of JS : runs this before writeFile func
 * 
 * to prevent this, we can call appendFile to writeFile call back function : check above func
 * 
 */ 

/*fs.appendFile(path.join(__dirname,'files','appendedFile.txt'),'Appended to the file',(err)=>{
    if(err) throw err;
    console.log('Appending complete');
});*/

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
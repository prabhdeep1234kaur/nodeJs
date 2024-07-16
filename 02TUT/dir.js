//making directory

const fs = require('fs');

/**
 * CREATE DIRECTORY
 */
//adding check if directory exists
if(!fs.existsSync('./new')){
    fs.mkdir('./new',(err)=>{
        if(err) throw err;
        console.log("Directory created");
    });
}else{
    console.log("Dir already exists");
}

/**
 * 
 * DELETE DIRECTORY
 * 
 */
if(fs.existsSync('./new')){
    fs.rmdir('./new',(err)=>{
        if(err) throw err;
        console.log("Directory deleted");
    });
}else{
    console.log("Dir doesnt exists");
}
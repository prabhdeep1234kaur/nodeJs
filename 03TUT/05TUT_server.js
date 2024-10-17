const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises  = require('fs').promises;

const logEvents = require("./logEvents");
const EventEmitter = require('events');
class Emitter extends EventEmitter{}; 

//initialize the object
const myEmitter = new Emitter();
myEmitter.on('log' , (msg, fileName)=> logEvents(msg, fileName));

//port on which the server will be on
const PORT = process.env.PORT || 3500; //

const serveFile = async (filePath, contentType, response)=>{
    try{
        const rawData = await fsPromises.readFile(
            filePath,
            !contentType.includes('image') ? 'utf8' : ''
        );
        const data = contentType === 'application/json' ? JSON.parse(rawData) : rawData;
        response.writeHead(
            filePath.includes('404.html') ? 404 : 200, //sending the status code  : 200 was default 
            {'Content-Type':contentType});
        response.end(
            contentType === 'application/json' ? JSON.stringify(data) : data
        );
    }catch(err){
        console.log(err);
        myEmitter.emit('log',`${err.name}:${err.message}\n`, 'errLog.txt');
        response.statusCode = 500;
        response.end();
    }
}

//MInimal server
const server = http.createServer((req, res)=>{
    console.log(req.url, req.method);
    myEmitter.emit('log',`${req.url}\t${req.method}\n`, 'reqLog.txt');

    /*
    basic steps for the running the file 
    1. add status code
    2. set header
    3. get path of the file
    4. read the file 
    5. send file content in response

    */

    //let path;

    //if else stmt : case for every possible page
    /** 
    if(req.url === '/' || req.url === 'index.html'){

        //setting response
        res.statusCode = 200; //success
        res.setHeader('Content-type','text/html'); //servering html page
        path = path.joing(__dirname, 'views', 'index.html'); //go inside views folder and server the html file
        fs.readFile(path,'utf8', (err, data)=>{ //reading the serve file
            res.end(data); //taking the data from the read file and sending it in the response.
        });
    }
    */

    //switch cases for request url : the followingtakes up a lot of space and not dynamic

    /*switch(req.url){
        case '/': 
            res.statusCode = 200;
            path = path.joing(__dirname, 'views', 'index.html');
            fs.readFile(path,'utf8', (err, data)=>{
                res.end(data);
            });
            break;
        case '404': 
    }*/

    //----SETTING UP EXTENSION
    const extension = path.extname(req.url); 

    //getting the content type
    let contentType;

    switch(extension){
        case '.css':
            contentType = 'text/css';
        break;

        case '.js':
            contentType = 'text/javascript';
        break;

        case '.json':
            contentType = 'application/json';
        break;

        case '.jpg':
            contentType = 'image/jpeg';
        break;

        case '.png':
            contentType = 'iamge/png';
        break;

        case '.txt':
            contentType = 'text/plain';
        break;

        default :
            contentType = 'text/html';
    }

    //----SETTING UP PATH
    // condition ? if true do this : if not true do this
    let filePath = 
        contentType === 'text/html' && req.url === '/' 
            ? path.join(__dirname,'views','index.html')
            : contentType === 'text/html' && req.url.slice(-1) === '/' 
                ? path.join(__dirname,'views',req.url,'index.html') //subdir
                : contentType === 'text/html'
                ? path.join(__dirname,'views', req.url)
                : path.join(__dirname, req.url); //could be css

    //no extension = only a slash and no extension : requested a file like about or mypage without .html
    //makes .html extension not required in the browser
    if(!extension && req.url.slice(-1) !== '/'){
        filePath += '.html'; //adding the .html to go int he above case
    }

    //----SETTING UP FILE
    //server the file
    const fileExists = fs.existsSync(filePath) //file exists?

    if(fileExists){
        //serve the file
        serveFile(filePath, contentType, res);
    }else{
        //to check the path that doesnt exist
        switch(path.parse(filePath).base){
            case 'old-page.html':
                res.writeHead(301,{ 'Location' : '/new-page.html'//301 is for redirection
                });
                res.end();
                break;
            case 'www-page.html':
                res.writeHead(301, {'Location': '/'});
                res.end();
            default:
                //serve a 404 response
                serveFile(path.join(__dirname,'views','404.html'), 'text/html', res);
        }
        
        //console.log(path.parse(filePath));
    }
});

//listen for request
server.listen(PORT, ()=> console.log(`Server Running on port ${PORT}`));

//LOGGING

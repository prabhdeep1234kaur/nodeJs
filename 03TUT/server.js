//importing express
const express = require('express'); 
//call it express
const app = express(); 
const path = require('path');
const cors = require('cors');
const {logger,logEvents}  = require('./middleware/logEvents');
const errorHandler  = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

//CUSTOM MIDDLEWARE
/**
 * custom log event
 * logEvents : two parameters 1. what to write, 2. where to write i.e. file name
 */
// app.use((req, res, next)=>{
//     logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
//     console.log( `${req.method} ${req.path}`);
//     next();
// });
app.use(logger);

//3RD PARTY
/**
 * 
 * to fill the undefined error we get in our reqlog.txt file : During custom middleware : access via google.com
 * we install 3rd party middleware : sudo npm i cors : cross origin resource sharing
 * but cors just as it is fine for open API but for some we might need whilelist
 * 
 */
const whiteList = ['https://www.google.com','http://127.0.0.1:5500', 'http://localhost:3500'] ; //access this backend node server, eg my website and my localhost ; localhost can be removed on live website 
//!origin is when we have undefined and remove it later
const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1 || !origin){ 
            //if origin is in the whilelist i.e. allowed to access the backend=> we do the callback 
            callback(null, true)
        }else{
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}
// JS has built in errors handling
app.use(cors(corsOptions)); 

//BUILT IN MIDDLEWARE
/**
 * app.use => often used to middleware to all routes coming in, get put, etc all come in waterfall and app is applied to all routes
 * 
 * THIS middleware handles : URL encoded data OR form data and pull that data out from the parameters
 * 
 * we have to use built-in middleware to fetch form data content
 * 
 */
app.use(express.urlencoded({extended: false}));

/**
 * 
 * if JSON Data submitted
 * 
 */
app.use(express.json());

/**
 * 
 * SERVE STATIC FILE example : css, img
 * 
 */
app.use('/',express.static(path.join(__dirname, '/public')));
//for the route inside subdir to use the css
app.use('/subdir',express.static(path.join(__dirname, '/public')));


//provide the route
/** 
 * route any request for the subdirectory to the router
 * 
*/
app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));
app.use('/employees', require('./routes/api/employees'));


//DEFAULT or CATCH ALL
/**
 * our custom status for 404
 */
// app.get('/*', (req, res)=>{
//     res.status(404).sendFile(path.join(
//         __dirname, 
//         'views',
//         '404.html' 
//     ));
// });

//APP USE vs APP ALL
app.all('*',(req, res)=>{
    res.status(404);
    
    if(req.accepts('html')){ // check for types
        res.sendFile(path.join(
            __dirname, 
            'views',
            '404.html' 
        ));
    }else if(req.accepts('json')){ // check for types
        res.json({error: '404 page not found'});
    }else{
        res.type('txt').send('404 not found');
    }
});
//CUSTOM ERROR HANDLING
app.use(errorHandler); 


//using app
app.listen(PORT, ()=> console.log(`Server Running on port ${PORT}`));
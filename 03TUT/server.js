//importing express
const express = require('express'); 
//call it express
const app = express(); 
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const {logger,logEvents}  = require('./middleware/logEvents');
const errorHandler  = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

//CUSTOM MIDDLEWARE
app.use(logger);

//3RD PARTY

// JS has built in errors handling
app.use(cors(corsOptions)); 

//BUILT IN MIDDLEWARE
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
app.use('/employees', require('./routes/api/employees'));


//DEFAULT or CATCH ALL

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
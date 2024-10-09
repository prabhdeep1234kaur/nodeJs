//importing express
const express = require('express'); 
//call it express
const app = express(); 
const path = require('path');
const PORT = process.env.PORT || 3500;

//define route
app.get('^/$|/index(.html)?',(req, res)=> {  
    //sent in response

    /*
        ^ / $ : begin with slash , end with slash
        | : OR
        /index.html : slash index.html file path directly

        /index(.html) : optinally if "/index" is entered in url
    */

    
    /*res.send('Hello world!');*/
    //send file
    /*res.sendFile(
        './views/index.html',
        { root:__dirname }
    );*/
    res.sendFile(
       path.join(__dirname, 'views' , 'index.html')
    );
});

app.get('/new-page(.html)?',(req, res)=>{
    res.sendFile(
        path.join(__dirname, 'views' , 'new-page.html')
    );
})


//REDIRECTION:
app.get('/old-page(.html)?',(req, res)=>{
    res.redirect(301,'/new-page.html'); 
    // 302 response code by default : search engine might not thing it is redirect : so we mention the status code along the file
});

//ROUT HANDLERS : 
/**
 * we can chain them
 */
app.get('/hello(.html)?', (req, res, next)=>{
    console.log("attemped to load a file.");
    next(); //moves to the next handler
}, (req, res)=>{
    res.send("heee ,,,");
    //if last : no next
});


//Chanining the routes handlers
const oneRoute = (req, res, next) => {
    console.log("one");
    next();
};
const twoRoute = (req, res, next) => {
    console.log("two");
    next();
};
const thirdRoute = (req, res) => {
    console.log("three");  
    res.send('Finised');  
};

app.get('/chain(.html)?',[oneRoute, twoRoute, thirdRoute]);

//DEFAULT or CATCH ALL
/**
 * our custom status for 404
 */
app.get('/*', (req, res)=>{
    res.status(404).sendFile(path.join(
        __dirname, 
        'views',
        '404.html' 
    ));
});



//using app
app.listen(PORT, ()=> console.log(`Server Running on port ${PORT}`));

const whiteList = [
    'https://www.google.com',
    'http://127.0.0.1:5500', 
    'http://localhost:3500'
]; 

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

module.exports = corsOptions;
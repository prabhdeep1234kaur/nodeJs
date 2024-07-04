console.log("hi")


//global object
//console.log(global);


//importing core elements using commonJS
//importing custom module

const os = require('os');
const path = require('path');
const math = require('./math');//OR the following
const {adds, subt, mult, divide, add} = require('./math');

//os
/*console.log(os.version());
console.log(os.type());
console.log(os.homedir());

console.log(__dirname);
console.log(__filename);

//path
console.log(path.dirname(__filename));
console.log(path.basename(__filename));
console.log(path.extname(__filename));
console.log(path.parse(__filename));*/

console.log(math.adds(2,5)); //OR the following
console.log(adds(2,4));
console.log(add(2,4));
console.log(mult(2,4));
console.log(divide(2,4));
console.log(subt(2,4));
//console.log(math.newFunAdd(3,4));
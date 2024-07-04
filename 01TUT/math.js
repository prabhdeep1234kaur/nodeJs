//CUSTOM MODULE

const add = (a,b)=>a+b;
const subt = (a,b)=>a-b;
const mult = (a,b)=>a*b;
const divide = (a,b)=>a/b;

function adds(a,b){
    return a+b;
}

//REMOVING THE MODULE.EXPORT
//exports.newFunAdd = (a,b) => a+b;

//exporting all the functions inside an object
module.exports = {add, adds, subt, mult, divide}


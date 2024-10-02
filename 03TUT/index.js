const logEvents = require("./logEvents");

//events common core modules

//common core module event
const EventEmitter = require('events');

class MyEmitter extends EventEmitter{}; //from the documentation

//initialize the object
const myEmitter = new MyEmitter();

//adding listerner for log event : on to add listener
myEmitter.on('log' , (msg)=> logEvents(msg));

//emit the event to test it out : emit to emitting the event
setTimeout(()=>{
    myEmitter.emit('log','Log Event emitted'); //we can add more than 1 perimeter

}, 2000);
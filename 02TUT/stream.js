//sometimes it is good to not grab aall the data at once,. it can be too much
//like moving a large amount of water bucket by bucket rathan than all at once
//more efficient on app

const fs = require('fs');
const path = require('path'); 

//reading stream
const rs = fs.createReadStream(path.join(__dirname,'files','sample.txt'),{encoding: 'utf8'});

//wrtinging stream
const ws = fs.createWriteStream(path.join(__dirname,'files','new-stream-file.txt'));

//reading on the data and lets call it datachunk and passing it to writing stream
// rs.on('data',(dataChunk)=>{ 
//     ws.write(dataChunk);
// });

//piping and more efficeient;
rs.pipe(ws);

const fs = require('fs');
const util = require('util');
var filePath = 'src/handlers/stream.json'

const readFile = util.promisify(fs.readFile);

let generateTokenUser = (user) => {
    let token = randomString(32)
    user.token = token
    fileStreamWrite(user)
    return token
}

let generateToken = () => {
    let token = randomString(32)
    return token
}

async function authToken() {
  return await readFile(filePath, 'utf8');
}

function fileStreamWrite(user) {
   fs.readFile(filePath, 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
            let obj = []
            if(data) {
                obj = JSON.parse(data); //now it an object
                let _obj = obj.filter((_user) => {
                    return _user.id !== user.id
                })
                obj = _obj
            }
            obj.push(user); //add some data
            let json = JSON.stringify(obj); //convert it back to json
            fs.writeFile(filePath, json, 'utf8', (err) => {
                console.log(err)
            }); // write it back 
    }});
}

function randomString(length) {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = length;
    var randomstring = '';
    for (var i=0; i<string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum,rnum+1);
    }
    return randomstring;
}

export default {
    generateTokenUser,
    generateToken,
    authToken
}
const userDB = {
    users: require("../model/users.json"),
    setUsers: function(data){this.users = data}
}

const fsPromises = require("fs").promises;
const path = require("path");
//install package for encrypted password
//sudo npm i bcrypt
const bcrypt = require("bcrypt");

//pulls infor
const handleNewUser = async(req, res) => {
    const {user, pwd} = req.body;
    //empty
    if(!user || !pwd) return res.status(400).json({"message": "Username and password are required."});
    //not empty : check for duplication username in db
    const duplicate = userDB.users.find(person => person.username === user);
    if(duplicate) return res.sendStatus(409);//conflict
    try{
        //encry the password : helps protect the password: if hash hacked easy to hack but salt round makes it harder
        const hashedPwd = await bcrypt.hash(pwd, 10);
        //store new user
        const newUser = {
            "username": user, 
            "roles": {"User":2001},
            "password": hashedPwd
        };
        userDB.setUsers([...userDB.users, newUser]);
        //write it to the json file
        await fsPromises.writeFile(
            path.join(__dirname, "..","model","users.json"), //overwrites existing file
            JSON.stringify(userDB.users) //specify data we are sending
        );
        console.log(userDB.users);
        res.status(201).json({"message":"New user"+user+" created"});
    }catch(err){
        res.status(500).json({"message":err.message+" Line "+err.stack});
    }
}

module.exports = {
    handleNewUser
};

const userDB = {
    users: require("../model/users.json"),
    setUsers: function(data){this.users = data}
}
const bcrypt = require("bcrypt");

const handleLogin = async(req,res)=>{
    const {user, pwd} = req.body;
    //empty
    if(!user || !pwd) return res.status(400).json({"message": "Username and password are required."});

    const foundUser = userDB.users.find(person => person.username === user);
    if(!foundUser) return res.sendStatus(401); //unauthorized
    //if found : evaluate pwd
    const match = await bcrypt.compare(pwd, foundUser.password);
    if(match){
        //Create JWT for logged in user only : normal token and refreshed token
        res.json({"message":"User is logged in."});
    }else{
        res.sendStatus(401);
    }
}

module.exports = {
    handleLogin
}
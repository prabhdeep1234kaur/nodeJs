const userDB = {
    users: require("../model/users.json"),
    setUsers: function(data){this.users = data}
}
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fsPromises = require('fs').promises;
const path = require("path");

const handleLogin = async(req,res)=>{
    const {user, pwd} = req.body;
    //empty
    if(!user || !pwd) return res.status(400).json({"message": "Username and password are required."});

    const foundUser = userDB.users.find(person => person.username === user);
    if(!foundUser) return res.sendStatus(401); //unauthorized
    //if found : evaluate pwd
    const match = await bcrypt.compare(pwd, foundUser.password);
    if(match){
        const roles = Object.values(foundUser.roles);
        //Create JWT for logged in user only : normal token and refreshed token
        //pass in payload : username obj //no pwd allowed //available to all who has token
        const accessToken = jwt.sign(
            {
                "UserInfo":{
                    "username": foundUser.username,
                    "roles" : roles
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: `30s`} //in prod: 15 minutes atleast
        );
        const refreshToken = jwt.sign(
            {"username": foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: `1d`}
        );
        //save refresh in DB : for logout route and invalidate token 
        //arr of other users who are not logged in anymore
        //saving refreshToken with current user to invalidate the user when to logout
        const otherUsers = userDB.users.filter(person=>person.username !== foundUser.username);
        const currentUser = {...foundUser, refreshToken};
        userDB.setUsers([...otherUsers,currentUser]);
        await fsPromises.writeFile(
            path.join(__dirname, "..","users.json"),
            JSON.stringify(userDB.users)
        );

        //store it in memory and not in cookie for security
        //set it as cookie as httpOnly : makes it unavailable to JS
        res.cookie("jwt", refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000}) ; //1 day
        
        res.json({accessToken});//for frontend dev to grab.
    }else{
        res.sendStatus(401);
    }
}

module.exports = {
    handleLogin
}
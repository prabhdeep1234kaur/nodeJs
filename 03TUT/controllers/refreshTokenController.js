const userDB = {
    users: require("../model/users.json"),
    setUsers: function(data){this.users = data}
}
const jwt = require("jsonwebtoken");
require('dotenv').config();

const handleRefreshToken = (req,res)=>{
    const cookies = req.cookies;
    //checking if cookie and then it also has jwt properties
    if(!cookies?.jwt) return res.sendStatus(401);
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;
    //match the user's refresh token with what we found
    const foundUser = userDB.users.find(person => person.refreshToken === refreshToken);
    if(!foundUser) return res.sendStatus(403); //forbidden
    //evalidate jwt
    jwt.verify(

        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded)=>{
            if(err || foundUser.username !== decoded.username){
                return res.sendStatus(403);
            } else {
                const accessToken = jwt.sign(
                    {
                        "username": decoded.username
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn: `30s`}
                );
                res.json({accessToken})
            }
        }
    );
}

module.exports = {
    handleRefreshToken
}
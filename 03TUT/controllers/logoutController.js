const userDB = {
    users: require("../model/users.json"),
    setUsers: function(data){this.users = data}
}
const fsPromises = require("fs").promises;
const path = require("path");

const handleLogout = async (req,res)=>{
    //on client : also delete acccess token(for frontend)

    const cookies = req.cookies;
    //checking if cookie and then it also has jwt properties
    if(!cookies?.jwt) return res.sendStatus(204);//no content to send back
    const refreshToken = cookies.jwt;
    //match the user's refresh token with what we found
    const foundUser = userDB.users.find(person => person.refreshToken === refreshToken);
    if(!foundUser) {
        //we dont have user but now we have a cookie
        res.clearCookie("jwt", {httpOnly: true});
        return res.sendStatus(204);//success but no content to send back
    }

    //so we found the same refresh token in db and we got to delete it 
    //other users would be all the users that we didnt find
    const otherUsers = userDB.users.filter(person=>person.refreshToken !== foundUser.refreshToken);
    const currentUser = {...foundUser, refreshToken: ""}; //refresh token is blank to erase it
    userDB.setUsers([...otherUsers, currentUser]); //so other users and current users with no token
    await fsPromises.writeFile(
        path.join(__dirname, "..","model","users.json"),
        JSON.stringify(userDB.users)
    );

    res.clearCookie("jwt",{httpOnly: true}); //secure: true // only serves on https : dev servers who use https : in prod
    res.sendStatus(204);
}

module.exports = {
    handleLogout
}
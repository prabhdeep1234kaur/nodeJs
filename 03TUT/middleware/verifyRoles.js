const verifyRoles = (...allowedRoles) => { //allowed to pass as many operators we want
    return (req,res,next) => {
        if(!req?.roles) return res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        console.log(rolesArray);
        console.log(req.roles);//set inside jwt set before verify roles middleware
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true); //return true if exists in the arr and returns the first match
        if(!result) return res.sendStatus(401); //unath
        next();
    }
}

module.exports = verifyRoles;
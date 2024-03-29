const jwt = require("jsonwebtoken");

const auth = (req, res, next)=>{
    const token = req.header("x-auth-token");
    if(!token){
        return res
            .status(401)
            .json({msg: "Not Authenticated. Access Denied!"});
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if(!verified){
        return res
            .status(401)
            .json({msg: "Authentication failed. Acess Denied!"});
    }

    req.user = verified.id;
    next();
}

module.exports = auth;
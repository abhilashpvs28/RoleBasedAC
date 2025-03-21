const jwt = require("jsonwebtoken");

const verifyToken = (req,res,next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        
        if(!token){
            return res.status(401).send({message:"No Token , Authorization Invalid"})
        }
        
        try {
            const decode = jwt.verify(token,process.env.JWT_SECRET)
            req.user = decode;
            console.log("The decode user is:", req.user);
            next();
            
        } catch (error) {
            res.status(400).send({message:"Token is not Valid!"})
        }
    } else{
        return res.status(401).send({message:"No Token , Authorization Invalid"})
    }
}

module.exports = verifyToken;
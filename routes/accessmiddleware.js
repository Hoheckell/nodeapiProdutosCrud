
const config = require('config');
const jwt = require('jsonwebtoken'); 

const verifyToken = (req, res, next) => {
    let jwtSecretKey = config.get('jwt.JWT_SECRET_KEY'); 
  
    try {
        let token = req.headers.authorization;// Remove Bearer from string
        token = token.replace(/^Bearer\s+/, "");
        const verified = jwt.verify(token, jwtSecretKey);
        if(verified){
            next();
        }else{ 
            // Access Denied 
            return res.status(401).send(error); 
        }

    } catch (error) { 
        // Access Denied 
        return res.status(401).send(error); 
    }
    
}

module.exports = verifyToken;
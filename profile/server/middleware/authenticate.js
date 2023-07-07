const jwt = require('jsonwebtoken')
const user = require('../model/userSchema')
//  const secretKey = ''

const Authenticate = async (req, res, next)=>{
    try{
        const token =  req.cookies.token;
        const verifyToken = jwt.verify(token,process.env.SECRETKEY)
        const rootUser  = await user.findOne({_id:verifyToken._id, "tokens.token":token})
        
        if(!rootUser){ throw new Error('User Not Found') }

        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;
        
        next()
    }catch(err){
       res.status(401).send("Unauthorized: No token provided");
    //    res.status(401).send('Unauthorized:No token provided');
        console.log(err)

    }
}

module.exports=Authenticate
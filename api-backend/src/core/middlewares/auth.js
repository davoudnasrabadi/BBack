const jwt = require("jsonwebtoken");
const bigMomentAuth = (req,res,next)=>{
   //Bearer TOKEN
   if(req.user){
       next();
   }
   const authHeader = req.headers['authorization'];
   const token = authHeader && authHeader.split(' ')[1];
   if(token === null){
       return res.status(401).json({msg:'Token not found'})
   }
   jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
       if(err){
         return res.status(403).json({msg:'Token not valid'})
       }
       req.user = user;
       next();
   })
}

const bigmomentAdminAuth = (req,res,next)=>{
   const authHeader = req.headers['authorization'];
   const token = authHeader && authHeader.split(' ')[1];
   if(token === null){
       return res.status(401).json({msg:'token not found'})
   }
   jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
       if(err){
        return res.status(403).json({msg:'Token not valid'})
       }
       req.user = user;
       if(req.user.role==='admin'){
       next();
       }
       else{
        return res.status(403).json({msg:'Access denied'})
       }
   })
}

const bigmomentTempTokenAuth =(req,res,next)=>{
    const authHeader = req.headers['authorization'];
   const token = authHeader && authHeader.split(' ')[1];
   if(token === null){
       return res.status(401).json({msg:'token not found'})
   }
   jwt.verify(token,process.env.JWT_SECRET,(err,email)=>{
       if(err){
        return res.status(403).json({msg:'Token not valid'})
       }
       req.email = email;
       next();
      
   })
}

module.exports = {
    bigMomentAuth,
    bigmomentAdminAuth,
    bigmomentTempTokenAuth
}
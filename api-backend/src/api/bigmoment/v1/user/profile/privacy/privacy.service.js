const {UserRepository} = require('../../../../../../database/user/user.repo');
const {validationResult} = require('express-validator');

class BigmometPrivacyService {
   
   constructor(){
      
      this.userRepo = new UserRepository();
    
   }
  
   //*************************************************************************************** 

   async save(req,res){
      
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       return res.status(400).json({msg:errors.array()});
    }
    try{
       const data = req.body;
       const id = req.user.id;
       const resp = await this.userRepo.completeProfile(data,id);
       return res.status(200).json({msg:'User profile successfully updated'});

    }
    catch(err){
       return res.status(500).json({err:err.message});
    }
      
   }

   //****************************************************************************************** 
   async change(req,res){
   
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       return res.status(400).json({msg:errors.array()});
    }
    try{
       const password = req.body.password;
       const id = req.user.id;
       const resp = await this.userRepo.changePass(password,id);
       if(resp){
             return res.status(200).json({msg:'User password successfully updated'});
        }
       else{
          return res.status(500).json({err:err.message});
       }

    }
    catch(err){
       return res.status(500).json({err:err.message});
    }
 }

 //****************************************************************************************** 


 
   
}

module.exports = {
    BigmometPrivacyService
}
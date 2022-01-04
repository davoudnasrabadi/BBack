const {UserRepository} = require('../../../../../database/user/user.repo');
const {validationResult} = require('express-validator');
class BigmomentProfileService {
   
   constructor(){
      
      this.userRepo = new UserRepository();
    
   }
  
   //************************************
   async checkUser(req,res){
      const {email} = req.body;
      
      //first check to see if there is exisiting user before
     const user = await this.userRepo.getByEmailAndProjectID(email,1);
     return user;
   }

   //********************************************************************************** 

   async saveMe(req ,res){
      try{
         const data = req.body;
         const id = req.user.id;
         const resp = await this.userRepo.completeProfile(data,id);
         return res.status(200).json({msg:'User updated successfully'});
         

      }
      catch(err){
         return res.status(500).json({err:err.message});
      }
   }

   //********************************************************************************* 
  
   async getMe(req,res){
      try{
         const resp = await this.userRepo.getMe(req.user.id);
         if(resp){
               return res.status(200).json({res:resp});
          }
         else{
            return res.status(500).json({err:err.message});
         }

      }
      catch(err){
         return res.status(500).json({err:err.message});
      }
   }

   //***********************************************************************************
   
   async getMeForUser(req,res){
      try{
         const resp = await this.userRepo.getMeForUser(req.params.id);
          return res.status(200).json({res:resp});

      }
      catch(err){
         return res.status(500).json({err:err.message});
      }
   }


   //*********************************************************************************** 
   async changeImage(req,res){
      const errors = validationResult(req);
      if(!errors.isEmpty()){
         return res.status(400).json({msg:errors.array()});
      }
      try{
         const data = req.body;
         const id = req.user.id;
         const resp = await this.userRepo.completeProfile(data,id);
         return res.status(200).json({msg:'User image updated successfully'});

      }
      catch(err){
         return res.status(500).json({err:err.message});
      }
   }

   //*********************************************************************************** 

   async getImage(){

   }

   //********************************************************************************* 

   async deleteImage(req,res){
      
      try{
         const id = req.user.id;
         const resp = await this.userRepo.deleteImage(id);
         return res.status(200).json({msg:'User avatar successfully removed'});
       

      }
      catch(err){
         return res.status(500).json({err:err.message});
      }
   }

   //********************************************************************************* 

   async changeEmail(req,res){
    

   }

   //********************************************************************************* 
   
   async verifyPhone(){

      //first verify phone then if ok save it into db
      
   }
   //********************************************************************************* 
   async notifSettings(req,res){
      const errors = validationResult(req);
      if(!errors.isEmpty()){
         return res.status(400).json({msg:errors.array()});
      }
      try{
         const data = req.body;
         const id = req.user.id;
         const resp = await this.userRepo.completeProfile(data,id);
         return res.status(200).json({msg:'User notification settings updated successfully'});
    

      }
      catch(err){
         return res.status(500).json({err:err.message});
      }
   }
   
   //*********************************************************************************** 
}

module.exports = {
    BigmomentProfileService
}
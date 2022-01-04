const {UserRepository} = require('../../../../../../database/user/user.repo');
const {HistoryRepository} = require('../../../../../../database/history/history.repo');
const {validationResult} = require('express-validator');
class BigmomentWalletService {
   
   constructor(){
      
      this.userRepo = new UserRepository();
      this.historyRepo = new HistoryRepository();
    
   }
  
   //************************************
   async checkUser(req,res){
      const {email} = req.body;
      
      //first check to see if there is exisiting user before
     const user = await this.userRepo.getByEmailAndProjectID(email,1);
     return user;
   }


   //*************************************************************** 

   async charge(req,res){
      const errors = validationResult(req);
      if(!errors.isEmpty()){
         return res.status(400).json({msg:errors.array()});
      }
      try{
         const data = req.body.amount;
         const id = req.user.id;
         const resp = await this.userRepo.charge(data,id);
         if(resp){
               return res.status(200).json({msg:'User wallet successfully charged'});
          }
         else{
            return res.status(500).json({err:err.message});
         }

      }
      catch(err){
         return res.status(500).json({err:err.message});
      }
      
   }

   //**************************************************************** 

   async getAmount(req,res){

      try{
         const id = req.user.id;
         const resp = await this.userRepo.getAmount(id);
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

   //*****************************************************************

   async disCharge(req,res){
      const errors = validationResult(req);
      if(!errors.isEmpty()){
         return res.status(400).json({msg:errors.array()});
      }
      try{
         const data = req.body.amount;
         const id = req.user.id;
         const resp = await this.userRepo.disCharge(data,id);
         if(resp){
               return res.status(200).json({msg:'User wallet successfully disCharged'});
          }
         else{
            return res.status(500).json({err:'Insufficient amount'});
         }

      }
      catch(err){
         return res.status(500).json({err:err.message});
      }
   }

   //******************************************************************* 

   async getHistory(req,res){
      try{
         const id = req.user.id;
         let page =1;
         let count = 8;
         if(req.body.page){
            page = req.body.page;
         }
         if(req.body.count){
            count = req.body.count;
         }
         let from = (page-1) * count;
         const resp = await this.historyRepo.getForUserById(id,from ,count);
         if(resp){
               return res.status(200).json({res:resp});
          }
         else{
            return res.status(500).json({err:'Internal Error'});
         }

      }
      catch(err){
         return res.status(500).json({err:err.message});
      }
   }



   //******************************************************************** 
 
   
}

module.exports = {
    BigmomentWalletService
}
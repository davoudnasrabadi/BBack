const {UserRepository} = require('../../../../database/user/user.repo');
const {TicketRepository} = require('../../../../database/ticket/ticket.repo');
const {validationResult} = require('express-validator');
class BigmomentTicketService {
   
   constructor(){
      
      this.userRepo = new UserRepository();
      this.ticketRepo = new TicketRepository();
    
   }
   
   //*********************************************************************
   async addTicket(req,res){
      const errors = validationResult(req);
      if(!errors.isEmpty()){
         return res.status(400).json({msg:errors.array()});
      }
      try{
         const data = req.body;
         const resp = this.ticketRepo.addTicket(data);
         if(resp){
               return res.status(200).json({msg:'Ticket inserted successfully'});
          }
         else{
            return res.status(500).json({err:err.message});
         }

      }
      catch(err){
         return res.status(500).json({err:err.message});
      }
   }
  
   //*************************************************************************
   async removeAll(req,res){

      try{
         const resp = await this.ticketRepo.removeAll();
         if(resp){
               return res.status(200).json({msg:'All tickets deleted successfully'});
          }
         else{
            return res.status(500).json({err:err.message});
         }

      }
      catch(err){
         return res.status(500).json({err:err.message});
      }
   }
   
   //*************************************************************************
   async remove(req,res){
      const errors = validationResult(req);
      if(!errors.isEmpty()){
         return res.status(400).json({msg:errors.array()});
      }
      try{
         const type = req.body.type;
         const resp = await this.ticketRepo.remove(type);
         if(resp){
               return res.status(200).json({msg:'All tickets deleted successfully'});
          }
         else{
            return res.status(500).json({err:err.message});
         }

      }
      catch(err){
         return res.status(500).json({err:err.message});
      }
   }

   //************************************************************************** 
    async getAll(req,res){
      try{
         const resp = await this.ticketRepo.getAll();
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
    //*********************************************************************** 
   
   
}

module.exports = {
    BigmomentTicketService
}
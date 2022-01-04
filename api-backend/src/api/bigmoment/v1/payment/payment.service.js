const {UserRepository} = require('../../../../database/user/user.repo');
const {TicketRepository} = require('../../../../database/ticket/ticket.repo');
const {validationResult} = require('express-validator');
const stripe = require('stripe');
class BigmomentPaymentService {
   
   constructor(){
      
      this.userRepo = new UserRepository();
      this.ticketRepo = new TicketRepository();
    
   }
   
   //*********************************************************************
   async direct(req,res){
      
   }
  
   //*************************************************************************
   async fromWallet(req,res){
      
    
   }
   
   //*************************************************************************

   
}

module.exports = {
    BigmomentPaymentService
}
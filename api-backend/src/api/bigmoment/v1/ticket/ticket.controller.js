const { Router } = require('express');
const {bigMomentAuth,bigmomentAdminAuth,bigmomentTempTokenAuth} = require('../../../../core/middlewares/auth');

const {BigmomentTicketService} = require('./ticket.service');
const { validate } =require('./ticket.schema');
const  bigmomentTicketController = (req,res,next)=>{
    const router = Router();
    

    router.post('/add',bigmomentAdminAuth,validate('add'),async(req,res)=>{
         const ticketService  = new BigmomentTicketService();
         ticketService.addTicket(req,res);
    })


    router.delete('/remove',bigmomentAdminAuth ,validate('remove'),async(req,res)=>{
        const ticketService  = new BigmomentTicketService();
        ticketService.remove(req , res);
          
    })

    router.delete('/removeAll',bigmomentAdminAuth , async(req , res)=>{
        const ticketService  = new BigmomentTicketService();
        ticketService.removeAll(req,res);
    })

    router.get('/getAll',async (req , res)=>{
        const ticketService  = new BigmomentTicketService();
        ticketService.getAll(req , res);

    })



    router.post('/bill' , (req,res)=>{
        
    })
    
 
   
      return router;
}

module.exports = {
    bigmomentTicketController
}
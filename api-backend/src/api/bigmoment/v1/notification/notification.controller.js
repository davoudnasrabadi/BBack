const { Router } = require('express');
const {bigMomentAuth,bigmomentAdminAuth,bigmomentTempTokenAuth} = require('../../../../../core/middlewares/auth');
const {BigmomentNotificationService} = require('./notification.service');
const { validate } =require('./notification.schema');
const  bigmomentNotificationController = (req,res,next)=>{
    const router = Router();


    router.post('/push',validate('send'),async (req,res)=>{
       
        const {name,family_name,email,message} = req.body;
        const data = {
            first_name:name,
            last_name: family_name,
            email:email,
            msg: message
        }
    

    });
    
    router.delete('/delete',bigmomentAdminAuth,async(req,res)=>{
      
    })


    router.get('/getAll', async(req , res)=>{

    })

    
    router.post('/saveNotifSettings',validate(''),async(req,res)=>{
        const notifService = new BigmomentNotificationService();
        notifService.saveNotifSettings(req,res);
        
    })

    router.get('/notifSettings',async (req,res)=>{
        
    })
   
      return router;
}

module.exports = {
    bigmomentNotificationController
}
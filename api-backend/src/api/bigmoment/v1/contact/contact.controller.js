const { Router } = require('express');
const {validate} = require('./contact.schema');
const {validationResult} = require('express-validator');
const {ContactRepository} = require('../../../../database/contact/contact.repo');
const {bigMomentAuth,bigmomentAdminAuth,bigmomentTempTokenAuth} = require('../../../../core/middlewares/auth');
const  bigmomentContactController = (req,res,next)=>{
    const router = Router();
    const contactRepo = new ContactRepository();
    

    router.get('/messages',bigmomentAdminAuth,async (req,res)=>{
        contactRepo.getMessages()
        .then((resp)=>{
            res.status(200).json({res:resp});
        })
        .catch((err)=>{
            res.status(500).json({err:err});
        })
        
	});

    router.post('/sendMessage',validate('send'),async (req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
           return res.status(400).json({msg:errors.array()});
        }
        const {name,family_name,email,message} = req.body;
        const data = {
            first_name:name,
            last_name: family_name,
            email:email,
            msg: message
        }
        
        contactRepo.insertMessage(data)
        .then((resp)=>{
            res.status(200).json({res:resp});
        })
        .catch((err)=>{
            res.status(500).json({err:err});
        })
        

    });
    
    router.delete('/remove',bigmomentAdminAuth,async(req,res)=>{
        contactRepo.removeMesssages()
        .then((resp)=>{
            res.status(200).json({res:resp});
        })
        .catch((err)=>{
            res.status(500).json({err:err});
        })
    })
   
      return router;
}

module.exports = {
    bigmomentContactController
}
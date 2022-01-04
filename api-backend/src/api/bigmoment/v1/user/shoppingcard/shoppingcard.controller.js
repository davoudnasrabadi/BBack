const { Router } = require('express');
const {validationResult} = require('express-validator');
const {bigMomentAuth,bigmomentAdminAuth,bigmomentTempTokenAuth} = require('../../../../../core/middlewares/auth');
const  bigmomentShoppingcardController = (req,res,next)=>{
    const router = Router();

    router.post('/get',async (req , res)=>{
        
    })

    
    router.get('/remove', async (req,res)=>{

    });
    

    router.post('/add', async (req , res)=>{
        
    })

    router.get('/getBill' , async(req,res)=>{

    })
      return router;
}

module.exports = {
    bigmomentShoppingcardController
}
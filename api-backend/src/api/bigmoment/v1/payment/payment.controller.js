const { Router } = require('express');
const {bigMomentAuth,bigmomentAdminAuth,bigmomentTempTokenAuth} = require('../../../../core/middlewares/auth');
const {BigmomentPaymentService} = require('./payment.service');
const  bigmomentPaymentController = (req,res,next)=>{
    const router = Router();


    router.post('/direct',async (req,res)=>{
        const bigmomentPaymentService = new BigmomentPaymentService();
        bigmomentPaymentService.direct(req,res);
    });


    router.post('/fromWallet', async(req,res)=>{
        const bigmomentPaymentService = new BigmomentPaymentService();
        bigmomentPaymentService.fromWallet(req,res);
    })
    
   
      return router;
}

module.exports = {
    bigmomentPaymentController
}
const { Router } = require('express');
const {bigMomentAuth,bigmomentAdminAuth,bigmomentTempTokenAuth} = require('../../../../../../core/middlewares/auth');
const {BigmomentWalletService} = require('./wallet.service');
const { validate } =require('./wallet.schema');
const  bigmomentWalletController = (req,res,next)=>{
    const router = Router();


    router.post('/charge',bigMomentAuth,validate('charge'),async (req,res)=>{
       
        const bigmomentWalletService = new BigmomentWalletService();
        bigmomentWalletService.charge(req,res);
        
    });


    router.post('/discharge' ,bigMomentAuth, validate('disCharge'), async(req,res)=>{
        const bigmomentWalletService = new BigmomentWalletService();
        bigmomentWalletService.disCharge(req,res);

    })

    router.post('/history',bigMomentAuth, validate('history'),(req,res)=>{
        const bigmomentWalletService = new BigmomentWalletService();
        bigmomentWalletService.getHistory(req,res);
    })

    router.get('/amount', bigMomentAuth,async(req,res)=>{
        const bigmomentWalletService = new BigmomentWalletService();
        bigmomentWalletService.getAmount(req,res);
    });


   
      return router;
}

module.exports = {
    bigmomentWalletController
}
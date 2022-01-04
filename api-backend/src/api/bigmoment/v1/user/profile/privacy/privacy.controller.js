const { Router } = require('express');
const {bigMomentAuth,bigmomentAdminAuth,bigmomentTempTokenAuth} = require('../../../../../../core/middlewares/auth');
const {BigmometPrivacyService} = require('./privacy.service');
const { validate } =require('./privacy.schema');
const  bigmomentPrivacyController = (req,res,next)=>{
    const router = Router();


    router.post('/change',bigMomentAuth,validate('change'),async (req,res)=>{
       
        const bigmomentPrivacyService = new BigmometPrivacyService();
        bigmomentPrivacyService.change(req,res);
        
    });

    router.post('/save',bigMomentAuth,validate('save'),async (req,res)=>{
       
        const bigmomentPrivacyService = new BigmometPrivacyService();
        bigmomentPrivacyService.save(req,res);
        
    });


      return router;
}

module.exports = {
    bigmomentPrivacyController
}
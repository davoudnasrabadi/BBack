const { Router } = require('express');
const { validate } =require('./profile.schema');
const {bigMomentAuth,bigmomentAdminAuth,bigmomentTempTokenAuth} = require('../../../../../core/middlewares/auth');
const {BigmomentProfileService} = require('./profile.service');
const {bigmomentWalletController} = require('./wallet/wallet.controller');
const {bigmomentPrivacyController} = require('./privacy/privacy.controller');
const  bigmomentProfileController = (req,res,next)=>{
    const router = Router();

    router.use('/wallet',bigmomentWalletController());
    router.use('/privacy',bigmomentPrivacyController());

    router.post('/save',bigMomentAuth,async (req , res)=>{
        let profileService = new BigmomentProfileService();
        profileService.saveMe(req,res);
    })

    
    router.get('/getMe', bigMomentAuth, async (req,res)=>{
           let profileService = new BigmomentProfileService();
           profileService.getMe(req,res);
    });

    router.get('/getUser/:id',bigMomentAuth, async(req,res)=>{
        let profileService = new BigmomentProfileService();
        profileService.getMeForUser(req,res);
    })

    router.delete('/deleteImage',bigMomentAuth, async(req,res)=>{
        let profileService = new BigmomentProfileService();
        profileService.deleteImage(req,res);
    });


    router.post('/changeEmail',bigMomentAuth,validate('changeEmail'), async(req,res)=>{
        let profileService = new BigmomentProfileService();
        profileService.changeEmail(req,res);
    });

    router.post('/verifyPhone', bigMomentAuth ,validate('verifyPhone'), async(req,res)=>{
        let profileService = new BigmomentProfileService();
        profileService.verifyPhone(req,res);
    });

    router.post('/notifSettings', bigMomentAuth ,validate('notifSettings'), async(req,res)=>{
        let profileService = new BigmomentProfileService();
        profileService.notifSettings(req,res);
    });

  

   
      return router;
}

module.exports = {
    bigmomentProfileController
}
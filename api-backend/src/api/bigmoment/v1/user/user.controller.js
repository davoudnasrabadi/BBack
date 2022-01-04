const { Router } = require('express');
const {validationResult} = require('express-validator');
const {UserRepository} = require('../../../../database/user/user.repo');
const cityTimezones = require('city-timezones');
const {changeTimezone} = require('./utility');
const {bigMomentAuth,bigmomentAdminAuth} = require('../../../../core/middlewares/auth');
const {bigmomentProfileController} = require('./profile/profile.controller');
const {bigmomentShoppingcardController} = require('./shoppingcard/shoppingcard.controller');
const  bigmomentUserController = (req,res,next)=>{
    const router = Router();
 
   
    router.use('/profile', bigmomentProfileController());
    router.use('/shoppingcard',bigmomentShoppingcardController());
    router.get('/userTimeZone',bigMomentAuth,async (req,res)=>{
        
            try{
                const userRepo = new UserRepository();
                let currentTime = new Date();
                const user = req.user;
                const {city,country} = await userRepo.getMe(user.user_id);
                const resp = cityTimezones.lookupViaCity(city);
                let timezone = resp[0].timezone;
                const userTime = changeTimezone(currentTime,timezone);
                res.status(200).json({msg:userTime})
                }
                catch(err){
                    console.log(err);
                    res.status(500).json({err:err.message});
                }

           })


      return router;
}

module.exports = {
    bigmomentUserController
}
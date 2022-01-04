const { Router } = require('express');
const {BigmomentAuthService} = require('./auth.service');
const { validate } =require('./auth.schema');
const {bigMomentAuth,bigmomentAdminAuth,bigmomentTempTokenAuth} = require('../../../../core/middlewares/auth');
const passport = require('passport');

module.exports=  bigMomentAuthController = (req,res,next)=>{
    const bigmomentAuthService = new BigmomentAuthService();
    const router = Router();
    
    router.post('/signup', validate('signup') ,(req,res)=>{
      bigmomentAuthService.signup(req,res)
   	});

    router.post('/signup2',validate('signup2'),bigmomentTempTokenAuth,(req,res)=>{
      bigmomentAuthService.signup2(req,res);
    })
    router.post('/login',validate('login'),(req,res)=>{
        bigmomentAuthService.login(req ,res);
    });

    router.post('/logout',bigMomentAuth,(req,res)=>{
      
      bigmomentAuthService.logout(req,res);
    });
    
    router.post('/verifyOtp',validate('otp'),(req,res)=>{
       bigmomentAuthService.verifyOtp(req,res);
    })
    router.post('/forgot',validate('forgot'),(req,res)=>{
          bigmomentAuthService.forgotPass(req,res);
    });

    router.post('/forgot2',validate('forgot2'),bigmomentTempTokenAuth,(req,res)=>{
            bigmomentAuthService.forgotPass2(req,res);
    })
    router.post('/token',(req,res)=>{
         bigmomentAuthService.createToken(req,res);
    });

    router.get('/getCities/:country',(req,res)=>{
         const {getCitiesByCountryName} = require('./lib/utility');
         const country = req.params.country;
         getCitiesByCountryName(country)
           .then((resp)=>{
            res.status(200).json({res:resp.data});
          })
            .catch((err)=>{
            res.status(500).json({err:err});
          })
    });
    
    router.get('/getCountries', (req,res)=>{
      const {getCountries} = require('./lib/utility');
         getCountries()
        .then((resp)=>{
         res.status(200).json({res:resp});
       })
         .catch((err)=>{
         res.status(500).json({err:err});
       })
    });
  
    //******************* Google Authentication **********
    router.get('/google', passport.authenticate('google', { scope: ['profile','email'] }));
   
    router.get('/google/callback', 
       passport.authenticate('google', { failureRedirect: '/api/bigmoment/v1/auth/login' }),
         function(req, res) {
        res.redirect('/api/bigmoment/v1');
     });
    //*************Facebook authentication **************
    router.get('/facebook', passport.authenticate('facebook', { scope: ['public_profile','email'] }));
   
    router.get('/facebook/callback', 
       passport.authenticate('facebook', { failureRedirect: '/api/bigmoment/v1/auth/login' }),
         function(req, res) {
        res.redirect('/api/bigmoment/v1');
     });

   
      return router;
}
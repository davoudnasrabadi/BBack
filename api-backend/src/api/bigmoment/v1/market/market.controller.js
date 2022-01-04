const { Router } = require('express');
const {bigMomentAuth,bigmomentAdminAuth,bigmomentTempTokenAuth} = require('../../../../core/middlewares/auth');
const { validate } =require('./market.schema');
const {BigmomentMarketService} = require('./market.service');
const  bigmomentMarketController = (req,res,next)=>{
    const router = Router();


    router.get('/getAll',async (req,res)=>{
       const bigmomentMarketService = new BigmomentMarketService();
       bigmomentMarketService.getAll(req,res);

    });

    router.get('/getImages',bigmomentAdminAuth,async (req,res)=>{
        const bigmomentMarketService = new BigmomentMarketService();
        bigmomentMarketService.getImages();
    })


    router.delete('/remove' ,bigmomentAdminAuth,validate('remove'), async(req,res)=>{
        const bigmomentMarketService = new BigmomentMarketService();
        bigmomentMarketService.deleteItem(req,res);
    })

    router.post('/get' ,async(req,res)=>{
        const bigmomentMarketService = new BigmomentMarketService();
        bigmomentMarketService.get(req,res);
    })


    router.post('/addToCard' , bigMomentAuth,async(req,res)=>{
        const bigmomentMarketService = new BigmomentMarketService();
        bigmomentMarketService.addToCard(req,res);
    })

    router.delete('/removeFromCard' , bigMomentAuth,async(req,res)=>{
        const bigmomentMarketService = new BigmomentMarketService();
        bigmomentMarketService.removeFromCard(req,res);
    })

    router.get('/bill',bigMomentAuth,async(req,res)=>{
        const bigmomentMarketService = new BigmomentMarketService();
        bigmomentMarketService.bill(req,res);
    })

    router.get('/add',bigmomentAdminAuth,async(req,res)=>{
        const bigmomentMarketService = new BigmomentMarketService();
        bigmomentMarketService.addItem(req,res);
    })

    
    
   
      return router;
}

module.exports = {
    bigmomentMarketController
}
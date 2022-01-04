const { Router } = require('express');
const {BigmomentGameService} = require('./game');
const {validate} = require('./game.schema');
const {validationResult} = require('express-validator');
const {bigMomentAuth,bigmomentAdminAuth} = require('../../../../core/middlewares/auth');
const  bigmomentGameController = (req,res,next)=>{
    const router = Router();
    const bigmomentGameService = new BigmomentGameService();
    


    router.get('/games',async (req,res)=>{
        res.end("hhii sfss")
    })

    router.get('/getImagePath/:name',async (req,res)=>{
       const name = req.params.name;
       bigmomentGameService.getImagePathByName(name)
       .then((resp)=>{
        res.status(200).json({res:result});
       })
       .catch((err)=>{
        res.status(500).json({err:err});
       })
       

	});

    router.post('/slices',async (req,res)=>{
        const name = req.body.name;
        const result = await bigmomentGameService.setSlices(name)
        .then((resp)=>{
            res.status(200).json({res:resp});
        })
        .catch((err)=>{
            res.status(500).json({err:err});
        })
    });
    
    //add game by admin
    router.post('/add',bigmomentAdminAuth,async (req,res)=>{
        const name = req.body.name
        const img_name = req.body.img_name;
        const xdim = req.body.xdim;
        const ydim = req.body.ydim;
        bigmomentGameService.addGame(name,img_name,xdim,ydim)
        .then((resp)=>{
            return res.status(200).json({msg:"Success"});
        })
        .catch((err)=>{
            return res.status(500).json({err:err.message});
        })
       
    })
    
    //delete game by admin
    router.delete('/delete',bigmomentAdminAuth,async(req,res)=>{
        const name = req.params.name;
        bigmomentGameService.deleteGame(name)
        .then((resp)=>{
            return res.status(200).json({msg:"Success"});
        })
        .catch((err)=>{
            return res.status(500).json({err:err.message});
        })
    })

    router.get('/getAllGames',async(req,res)=>{
        bigmomentGameService.getGames()
        .then((resp)=>{
            return res.status(200).json({res:resp});
        })
        .catch((err)=>{
            return res.status(500).json({err:err.message});
        })
    })
    router.post('/gameSetStartDate',(req,res)=>{
        const name = req.body.name;
        const date = req.body.date;
        bigmomentGameService.setStartDate(name)
        .then((res)=>{
            res.status(200).json({res:res});
        })
        .catch(err=>{
            res.status(500).json({err:err})
        })
    })

    router.post('/gameImageSpec',validate('gameImage'),(req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
           return res.status(400).json({msg:errors.array()});
        }
        const game = req.body.name;
        bigmomentGameService.getImageSpecByGameName(game)
        .then((resp)=>{
            res.status(200).json({res:resp});
        })
        .catch((err)=>{
            res.status(500).json({err:err});
        })
    })

    router.post('/gameInfo',bigMomentAuth,validate('gameInfo'),(req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
           return res.status(400).json({msg:errors.array()});
        }
         const name = req.body.name;
         bigmomentGameService.getGameInfoByName(name)
         .then((resp)=>{
            res.status(200).json({res:resp});
         })
         .catch((err)=>{
            res.status(500).json({err:err});
         })
    })

    router.get('/main',(req,res)=>{
        //load upcomming games...

    })
   
      return router;
}

module.exports = {
    bigmomentGameController
}
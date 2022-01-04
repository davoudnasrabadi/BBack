const { Router} = require('express');
const bigMomentAuthController = require('./auth/auth.controller');
const {bigmomentGameController} = require('./game/game.controller');
const {bigMomentAuth,bigmomentAdminAuth} = require('../../../core/middlewares/auth');
const {bigmomentContactController} = require('./contact/contact.controller');
const {bigmomentTicketController} = require('./ticket/ticket.controller');
const {bigmomentUserController} = require('./user/user.controller');
const {bigmomentMarketController} = require('./market/market.controller');
const  bigMomentV1Router = () => {
	const router = Router();
    
	 //* /api/bigmoment/v1
	 router.use('/auth',bigMomentAuthController());
	 router.use('/game', bigmomentGameController());
	 router.use('/contact', bigmomentContactController());
	 router.use('/user', bigmomentUserController());
	 router.use('/ticket',bigmomentTicketController());
	 router.use('/market',bigmomentMarketController());
	router.get('/dashboard',bigMomentAuth,(req,res)=>{
		console.log(req.user);
		res.end('hi from dashboardddd');
	})

	router.get('/admindashboard',bigmomentAdminAuth,(req,res)=>{
		res.end('hi from admin dashboard');
	})
    router.get('/',bigMomentAuth,(req,res)=>{
		let id = null;
		//req.user.id
        res.end(`hi main page of bigmoment, welocome: ${req.user.id}`);
    })

	return router;
};
module.exports= {
	bigMomentV1Router
}
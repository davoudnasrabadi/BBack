const {Router} = require('express');
const {bigMomentV1Router} = require('./v1/index')

const  bigMomentMainRouter = ()=> {
	const router = Router();
	router.use('/v1', bigMomentV1Router());

	return router;
};

module.exports = {bigMomentMainRouter}

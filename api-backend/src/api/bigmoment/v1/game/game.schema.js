const { check } = require('express-validator');


 const validate = (method) => {
	switch (method) {
		case 'gameInfo': 
			return [
				check('name','Name of game should be string').isString()
		
			];

        case 'gameImage':
			return [
				check('name','Name of game should be string').isString()
		
			];


	}
};
module.exports= {
	validate
}

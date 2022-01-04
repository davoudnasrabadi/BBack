const { check } = require('express-validator');


 const validate = (method) => {
	switch (method) {
		case 'add': 
			return [
                check('type','Type should be a valid string(Cup,Supercup,Weekend Final,Monthly Final').isString().isIn(['Cup', 'Supercup', 'Weekend Final','Monthly Final']),
				check('day','day should be number').isNumeric(),
				check('month','month should be number').isNumeric(),
				check('year','year should be number').isNumeric(),
				check('hour','hour should be number').isNumeric(),
				check('minute','minute should be number').isNumeric()
			];

        case 'remove':
            return [
				check('type','gameType should be a valid string(Cup,Supercup,Weekend Final,Monthly Final').isString().isIn(['Cup', 'Supercup', 'Weekend Final','Monthly Final'])
				
			];
       

	}
};
module.exports= {
	validate
}

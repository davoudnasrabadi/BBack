const { check } = require('express-validator');


 const validate = (method) => {
	switch (method) {
		case 'change': 
			return [
                check('password','Password should be at least 6 characters').isString().isLength({min:6,max:20}),

			];

        case 'save':
            return [
				check('display_name','display_name should be string').isString(),
                check('address','displayName should be string').isString(),
                check('postalCode','postalCode should be number').isNumeric(),
				
			];

	}
};
module.exports= {
	validate
}

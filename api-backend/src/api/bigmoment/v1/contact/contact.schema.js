const { check } = require('express-validator');


 const validate = (method) => {
	switch (method) {
		case 'send': 
			return [
				check('name','Name must be string with at least 3 characters').isString().isLength({min:3,max:20}),
				check('family_name','Name must be string with at least 3 characters').isString().isLength({min:3,max:20}),
				check('email','Email should be string containing @ character').isString().isEmail(),
				check('message','Message should be at least 6 characters').isString().isLength({min:6,max:50})
			];

	}
};
module.exports= {
	validate
}

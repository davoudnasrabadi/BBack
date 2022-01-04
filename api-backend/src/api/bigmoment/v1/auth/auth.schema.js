const { check } = require('express-validator');


 const validate = (method) => {
	switch (method) {
		case 'signup': 
			return [
				check('email','Email should be string containing @ character').isString().isEmail(),
				
			];
		
		case 'signup2':
			return [
				check('name','Name must be string with at least 6 characters').isString().isLength({min:6,max:20}),
				check('country','Country should be string').isString(),
				check('city','City should be string').isString(),
				check('password','Password should be at least 6 characters').isString().isLength({min:6,max:20}),
			    check('password2','Password should be at least 6 characters').isString().isLength({min:6,max:20})

			];

        case 'login':
			return [
				check('email','Email should be string containing @ character').isString().isEmail(),
				check('password','Password should be at least 6 characters').isString().isLength({min:6,max:20}),
			];

		case 'otp':
			return [
					check('otp','Otp should be string').isString()
		
			];

		case 'forgot':
			return [
				check('email','Email should be string containing @ character').isString().isEmail()
			];
		
		case 'forgot2':
			return [
				check('password','Password should be at least 6 characters').isString().isLength({min:6,max:20}),
				check('password','Password should be at least 6 characters').isString().isLength({min:6,max:20}),
			];



	}
};
module.exports= {
	validate
}

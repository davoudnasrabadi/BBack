const { check } = require('express-validator');


 const validate = (method) => {
	switch (method) {
		case 'save': 
			return [
				check('pauseAll','pauseAll must be boolean').isBoolean(),
				check('inGame','inGame must be boolean').isBoolean(),
				check('email','email must be boolean').isBoolean(),
                check('sms','gameType should be a valid string').isBoolean(),
			];
       

	}
};
module.exports= {
	validate
}

const { check } = require('express-validator');


 const validate = (method) => {
	switch (method) {

        case 'remove':
            return [
				check('type','gameType should be a valid string(Cup,Supercup,Weekend Final,Monthly Final').isString().isIn(['Cup', 'Supercup', 'Weekend Final','Monthly Final'])
				
			];
		
		case 'changeEmail':
			return [
				check('email','email should be valid string').isEmail()
				
			];
		
		case 'verifyPhone':
			return [
				check('phone','phone should be valid string').isString()
				
			];

		case 'notifSettings':
			return [
			      check('pauseAllNotif','phone should be boolean').isBoolean(),
				  check('inGameNotif','phone should be boolean').isBoolean(),
				  check('emailNotif','phone should be boolean').isBoolean(),
				  check('smsNotif','sms should be boolean').isBoolean()
					
				];
		case 'changeImage':
				return [
					check('avatar','avatar url should be string').isString(),		
					];
		

       

	}
};
module.exports= {
	validate
}

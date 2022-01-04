const { check } = require('express-validator');


 const validate = (method) => {
	switch (method) {
		case 'charge': 
			return [
                check('amount','amount must be number and greater than 0').isNumeric({min:0,max:1000000}),
				
			];

        case 'disCharge':
            return [
				check('amount','amount must be number and greater than 0').isNumeric({min:0,max:1000000})
				
			];
		case 'history':
			return [
				check('page','page must be number and greater than  or equal 0').isNumeric(),
				check('count','count must be number and greater than 0').isNumeric()
					
			];
			
		
    
	}
};
module.exports= {
	validate
}
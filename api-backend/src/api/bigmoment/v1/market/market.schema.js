const { check } = require('express-validator');


 const validate = (method) => {
	switch (method) {
		case 'add': 
			return [
				check('name','Name must be a valid string').isString(),
				check('market','market should be a valid string').isString(),
				check('type','type should be a valid string').isString(),
				check('file_name','file_url should be a valid string').isString(),
				check('author','contract_add should be a valid string').isString(),
				check('contract_add','contract_add should be a valid string').isString(),
				check('token_id','token_id should be a valid number').isNumeric(),
				check('pieces','pieces should be a valid number').isNumeric(),
				check('price','price should be a valid number').isNumeric(),
			];

        case 'remove':
            return [
				check('name','name must be a valid string').isString(),
				
			];
		
		case 'addToCard':
				return [
					check('id','id of item should be number').isNumeric(),
					
				];
		case 'removeFromCard':
				return [
						check('id','id of item should be number').isNumeric(),
						
				];
       

	}
};
module.exports= {
	validate
}

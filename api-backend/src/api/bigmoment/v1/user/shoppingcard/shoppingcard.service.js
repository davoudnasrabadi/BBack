const {UserRepository} = require('../../../../database/user/user.repo');

class BigmomentShoppingcardService {
   
   constructor(){
      
      this.userRepo = new UserRepository();
    
   }
  
   //************************************
   async checkUser(req,res){
      const {email} = req.body;
      
      //first check to see if there is exisiting user before
     const user = await this.userRepo.getByEmailAndProjectID(email,1);
     return user;
   }
  
   async getMe(){
       
   }
   
}

module.exports = {
    BigmomentShoppingcardService
}
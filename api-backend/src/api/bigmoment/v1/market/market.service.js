const {UserRepository} = require('../../../../database/user/user.repo');
const {validationResult} = require('express-validator');
const {GameBoardRepository} = require('../../../../database/gameboard/gameboard.repo');
class BigmomentMarketService {
   
   constructor(){
      
      this.userRepo = new UserRepository();
      this.gameBoardRepo = new GameBoardRepository();
    
   }
  
   //************************************
   async checkUser(req,res){
      const {email} = req.body;
      
      //first check to see if there is exisiting user before
     const user = await this.userRepo.getByEmailAndProjectID(email,1);
     return user;
   }

   //********************************************************************************* 

   async getAll(req,res){
   
      try{
      
         const resp = await this.gameBoardRepo.getAll();
         return res.status(200).json({res:resp})


      }
      catch(err){
         return res.status(500).json({err:err.message});
      }
      
   }

   //*************************************************************************** 


   async get(req,res){
   
      try{
         const query = req.body;
         const resp = await this.gameBoardRepo.get(query);
         return res.status(200).json({res:resp})

      }
      catch(err){
         return res.status(500).json({err:err.message});
      }
      
   }

   //*************************************************************************** 
   async addItem(req,res) {
      try{
         let data= req.body;
         const final_data= {
             name:data.name,
             market: data.market,
             type:data.type,
             file_name: __dirname +'/market'+data.img_name,
             author:data.author,

          }
         const resp = await this.gameBoardRepo.insert(final_data);
         return res.status(200).json({msg:'Item added to market'})
      

      }
      catch(err){
         return res.status(500).json({err:err.message});
      }

   }

   //*******************************************************************************

   async deleteItem(req,res){
      const errors = validationResult(req);
      if(!errors.isEmpty()){
         return res.status(400).json({msg:errors.array()});
      }
      try{
         const name= req.body.name;
         const resp = await this.gameBoardRepo.deleteByName(name);
         return res.status(200).json({msg:'Item(s) removed successfully'})
    

      }
      catch(err){
         return res.status(500).json({err:err.message});
      }
   }

   //*********************************************************************************
   async addToCard(req,res){
      const errors = validationResult(req);
      if(!errors.isEmpty()){
         return res.status(400).json({msg:errors.array()});
      }
      try{
         const id= req.body.id;
         const user_id = req.user.id;
         const resp = await this.gameBoardRepo.addToCard(id,user_id);
         if(resp == 'Item not found'){
            return res.status(404).json({msg:'Item not found'})
         }
         return res.status(200).json({msg:'Item added to shopping card successfully'})
    

      }
      catch(err){
         return res.status(500).json({err:err.message});
      }
   }

   //******************************************************************************** */

   async removeFromCard(req,res){
      const errors = validationResult(req);
      if(!errors.isEmpty()){
         return res.status(400).json({msg:errors.array()});
      }
      try{
         const id= req.body.id;
         const user_id = req.user.id
         const resp = await this.gameBoardRepo.removeFromCard(id,user_id);
         return res.status(200).json({msg:'Item removed from shopping card successfully'})
    

      }
      catch(err){
         return res.status(500).json({err:err.message});
      }
   }
   //********************************************************************************** */
   async bill(req,res){

      try{
         const id = req.user.id;
         const resp = await this.gameBoardRepo.bill(id);
         return res.status(200).json({res:resp});
    

      }
      catch(err){
         return res.status(500).json({err:err.message});
      }
   }
   //*********************************************************************** */

   async getImages(req,res){ 

   }

   
}

module.exports = {
    BigmomentMarketService
}
const {GameRepositoy} = require('../../../../database/game/game.repo');
const {PuzzleRepository}  = require('../../../../database/puzzle/puzzle.repo');
const {Slice} = require('./slice');
const sizeOf = require('image-size');
const {encrypt} = require('../../../../lib/security');
const fs = require('fs');
const {decode} = require('./utility');
const path = require('path');
const {checkIfEdge} = require('./utility');
const { compareSync } = require('bcrypt');
const {database} = require('../../../../database/init');

 class BigmomentGameService {
    
    constructor(name,startTime,img_path,xdim,ydim,type){
       this.gameRepo = new GameRepositoy();
       this.slices = [];
       this.name = name;
       this.startTime = startTime;
       this.img_path = img_path;
       this.xdim = xdim;
       this.ydim = ydim;
       this.type = type;
    }
    
    startGame(game_id){
        const data = {
            running:true
        }
    }
    
    initGame(img_path){
       
    }
    
    async getImagePathByName(name){

        return new Promise(async (resolve,reject)=>{
            try{
                const res = await this.gameRepo.getImageGameByName(name);
                resolve(res);
            }
            catch(err){
               reject(err.message);
            }
        })
         
        
    }
    //************************************************* 
    async getSlices(){

    }
    //*************************************************
    async saveGame(data){
        const res = await this.gameRepo.insertGame(data);
        return res;
    }
    
    //**************************************************** 
    async deleteGame(name){
        return new Promise(async (resolve,reject)=>{
            try{
                const res = await this.gameRepo.removeGameByName(name);
                resolve(res);
            }
            catch(err){
               reject(err.message);
            }
        })
     
    }
    //************************************************* 
    async getDims(gameName){
        const dims = await this.gameRepo.getDimsByName(gameName);
        return dims;
    }

    //************************************************** 
    async getGameInfoByName(game_name){
        return new Promise(async(resolve , reject)=>{
            try{
               const resp = await this.gameRepo.getGameInfoByName(game_name);
               resolve(resp);
            }
            catch(err){
                reject(err.message);
            }
        
        })
    }
    //************************************************* 
    async setSlices(name){

       return new Promise(async (resolve,reject)=>{
        try{
            let pathOfImage = __dirname+"/image"+"/"+name;
            if(!fs.existsSync(pathOfImage)){
               resolve(null);
            }
            else{
                const dims = await this.getDims(name);
                const xdim = dims.xdim;
                const ydim = dims.ydim;
                //For each file inside pathOfImage read them and create slice...
                fs.readdir(pathOfImage, function (err, files) {
                 //Handling error
                 if (err) {
                     throw err;
     
                 } 
                 let slices = [];
                 //Listing all files using forEach
                 files.forEach(function (file) {
                     let slice_object = {};
                     if(!file.includes('outline') && !file.includes('data')){
                         let f= file;
                        file = decode(file);
                        if(file.includes('piece')){
                            slice_object.name = file;
                           // fileName= console.log(file.split('\n')[0]);
                            let arr = file.split('_');
                            let y = arr[1];
                            let x = arr[2].split('.')[0];
                            if(x ==0 || x== xdim-1 || y==0 || y==ydim-1){
                                slice_object.isEdge= true;
                              }
                              else slice_object.isEdge=false;
                            slice_object.name = f;
                            slices.push(slice_object);
                        }
                       
                     }
                     
                     
                 });
                 resolve(slices);
             });
                
            }
            
        }
        catch(err){
           reject(err.message);
        }
    })
    }

    //********************************************************
    
    //****************************************************** 

    //**************
    async addGame(game_name,img_name,xdim,ydim){
        return new Promise(async (resolve,reject)=>{
            try{
                const img_path = 'api-backend/src/api/bigmoment/v1/game/image/'+img_name;
                const data = {
                    game_name:game_name,
                    img_path:img_path,
                    xdim:xdim,
                    ydim:ydim
                }
                const res = await this.gameRepo.insertGame(data);
                resolve("success");
            }
            catch(err){
               reject(err.message);
            }
        })
      
    }
    //***************** 

    async getGames(){
        return new Promise(async (resolve,reject)=>{
            try{
                const games = await this.gameRepo.getAllGames();
                resolve(games);
            }
            catch(err){
               reject(err.message);
            }
        })


    }

    //*************************************************** 
    async setStartDate(game_name,data){
        return new Promise(async (resolve,reject)=>{
            try{
                const res = await this.gameRepo.updateGameByName(game_name,data);
                resolve(res);
            }
            catch(err){
               reject(err.message);
            }
        })

    }

    getPathForGameName(game_name){
         
    }

    async loadGame(user_id,game_name){
        let puzzleRepo = new PuzzleRepository();
        let path =  this.getPathForGameName(game_name);


        const res = puzzleRepo.getRowsByUserIdAndGameId(user_id,game_name);
        res.forEach((item)=>{

        })
    }
    
    async setState(user_id,game_id){

    }

    async getImageSpecByGameName(game_name){
        
          return new Promise(async (resolve,reject)=>{
            try{
                let img_path = await (await this.gameRepo.getImageGameByName(game_name)).img_path;
                const name = path.basename(img_path);
                let fullPath=__dirname+"/image/"+path.basename(img_path);
                let isLandscape=false;
                const dims = sizeOf(fullPath);
                if(dims.width> dims.height){
                    isLandscape=true
                }
                const res = {
                    name:name,
                    width: dims.width,
                    height: dims.height,
                    fullPath:fullPath,
                    isLandscape:isLandscape
                }
                resolve(res);
            }
            catch(err){
               reject(err.message);
            }
        })
    }

    async getUpcomingGames(date){
        
    }

    //************************************************************* 
    async addUserToStage(game_name,user_id){
        
        return new Promise(async (resolve , reject)=>{
            database.getRedis().get(game_name,(err,result)=>{
                  if(err){
                      reject(err.message);
                  }
                  let newVal =  result +","+ user_id.toString();
                  database.getRedis().set(game_name,newVal)
                  .then((resp)=>{
                      resolve("success")
                  })
                  .catch((err)=>{
                      reject(err.message);
                  })
            })
        })
    
    }
    
    //************************************************************* 
    async removeUserFromStage(game_name,user_id){
             return new Promise(async (resolve,reject)=>{
                  database.getRedis().get(game_name,(err,result)=>{
                    if(err){
                        reject(err.message);
                    }
                    let userToRemove = user_id.toString();
                    let newVal=null;
                    if(result.startsWith(userToRemove)){
                        newVal = result.replace(userToRemove+",","");
                    }
                    else{
                        newVal = result.replace(","+userToRemove,"");
                    }
                        database.getRedis().set(game_name,newVal)
                        .then((resp)=>{
                            resolve("success")
                        })
                        .catch((err)=>{
                            reject(err.message);
                        })

                  });
             });
    }

    //************************************************************** 
    
    
}



module.exports ={
    BigmomentGameService
}
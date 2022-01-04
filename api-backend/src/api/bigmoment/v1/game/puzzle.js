const {PuzzleRepository}  = require('../../../../database/puzzle/puzzle.repo');
class Puzzle {
   
    constructor(game_name,user_id){
        this.game_name = game_name;
        this.slices = [];
        this.user_id=user_id;
        this.puzzleRepo = new PuzzleRepository();
    }

    addSlice(x,y,user_id,game_name){
        return new Promise(async (resolve,reject)=>{
            try{
                const insert_data = {
                    user_id,
                    game_name,
                    x,
                    y,
                    isEdge
                }
                const res = await this.puzzleRepo.insertRow(insert_data)
                resolve(res);
            }
            catch(err){
               reject(err.message);
            }
        })
    }

    removeSlice(x,y,user_id,game_name){
        return new Promise(async (resolve,reject)=>{
            try{
                
                const res = await this.puzzleRepo.deleteRowByUserId(x,y,user_id,game_name)
                resolve(res);
            }
            catch(err){
               reject(err.message);
            }
        })
    }


    loadFromDB(user_id,game_name){
        return new Promise(async (resolve,reject)=>{
            try{
                
                const res = await this.puzzleRepo.getRowsByUserIdAndGameName(user_id,game_name)
                //for each slice
                let slices = [];
                res.forEach((item)=>{
                   const obj = {};
                   obj.x = item.x;
                   obj.y = item.y;
                   obj.isEdge = item.isEdge;
                   obj.x_loc = item.x_loc;
                   obj.y_loc = item.y_loc;
                   slices.push(obj);
                });

                return slices;
                
            }
            catch(err){
               reject(err.message);
            }
        })
    }

}

module.exports = {
    Puzzle
}
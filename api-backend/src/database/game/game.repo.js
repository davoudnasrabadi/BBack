const { Prisma  }=require('@prisma/client');
const {database} = require('../../database/init');
class GameRepositoy {
	constructor() {
		this.db = database;
	}

	async getGame(game_id) {
		const result = await this.db.getPrisma().game.findFirst({
			where: { game_id},
			select: {
				game_id: true,
				game_name: true,
				time: true,
				tickets: true,
                files:true,
				running:true
			},
		});
		return result;
	}

	

	async updateGameByID(game_id,data)
    {
		const result = await this.db.getPrisma().game.update({
			data: data,
			where: { game_id},
		});
		return result.count;
	}

	async updateGameByName(game_name,data)
    {
		const result = await this.db.getPrisma().game.update({
			data: data,
			where: { game_name:game_name},
		});
		return result.count;
	}


	async insertGame(data) {
		const result = await this.db.getPrisma().game.create({
			data: data,
		});
		return result;
	}


	async removeGameById(game_id){
		const result = await this.db.getPrisma().game.delete({
			where: { game_id },
		});
		return result.count;
	}
    
	async getImageGameByName(name){
		const result = await this.db.getPrisma().game.findFirst({
			where: { game_name:name},
			select: {
				img_path:true
			},
		});
		return result;
	}
    
    async getDimsByName(name){
		const result = await this.db.getPrisma().game.findFirst({
			where: { game_name:name},
			select: {
			    xdim:true,
				ydim:true
			},
		});
		return result;
	}

	async getAllGames(){
        
		const result = await this.db.getPrisma().game.findMany();
		return result;
	}

	async removeGameByName(game_name){
		const result = await this.db.getPrisma().game.deleteMany({
			where: { game_name:game_name },
		});
		return result.count;
	}
    
	async getGameInfoByName(game_name){
		const result = await this.db.getPrisma().game.findFirst({
			where: { game_name:game_name},
			select: {
			   game_id:true,
			   game_name:true,
			   type:true,
			   time:true,
			   img_path:true,
			   running:true,
			   xdim:true,
			   ydim:true,
			   
			},
		});
		return result;
	}
    

}

module.exports = {
	GameRepositoy
}



const { Prisma  }=require('@prisma/client');
const {database} = require('../../database/init');
const {Slice} = require('../../api/bigmoment/v1/game/slice');
class PuzzleRepository {

	constructor() {
		this.db = database;
	}

	async update(data) {
		const result = await this.db.getPrisma().user.deleteMany({
			where: { user_id },
		});
		return result.count;
	}

	async deleteRowsByUserId(user_id) {
		const result = await this.db.getPrisma().puzzle.deleteMany({
			where: { user_id:user_id },
		});
		return result.count;
	}

	async insertRow(data) {
		const result = await this.db.getPrisma().puzzle.create({
			data: data,
		});
		return result;
	}
    
    async getRowsByUserIdAndGameName(user_id,game_name){
        const result = await this.db.getPrisma().puzzle.findMany({
			select: {
				x,
				y,
				isEdge,
				x_loc,
				y_loc
			},
			where: {user_id:user_id,game_name:game_name}
		});
		return result;
    }

	async deleteRowByUserId(user_id,game_name,x,y) {
		const result = await this.db.getPrisma().puzzle.delete({
			where: { user_id:user_id,game_name:game_name,x:x,y:y},
		});
		return result.count;
	}

  
}

module.exports = {
	PuzzleRepository
}



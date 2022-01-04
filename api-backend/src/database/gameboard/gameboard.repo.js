const { Prisma  }=require('@prisma/client');
const {database} = require('../../database/init');
class GameBoardRepository {

	constructor() {
		this.db = database;
	}

	async getAll() {
		const result = await this.db.getPrisma().gameBoard.findMany({
		});
		return result;
	}

	async deleteByName(name) {
		const result = await this.db.getPrisma().gameBoard.deleteMany({
			where: { name:name },
		});
		return result.count;
	}

	async insert(data) {
		const result = await this.db.getPrisma().gameBoard.create({
			data: data,
		});
		return result;
	}

	async updateGameBoard(name,data){
		const result = await this.db.getPrisma().gameBoard.update({
			data: data,
			where: { name:name},
		});
		return result.count;
	}

	async deleteById(id){
		const result = await this.db.getPrisma().gameBoard.delete({
			where: { id:id },
		});
		return result.count;
	}


	async deleteByName(name){
		const result = await this.db.getPrisma().gameBoard.deleteMany({
			where: { name:name },
		});
		return result.count;
	}

	// ***************************************************************************
    
	async get(query) {
		if(query.market && query.type){
			const result = await this.db.getPrisma().gameBoard.findMany({
				where: { market:query.market,type:query.type },
			});
			return result;
		}
		else if(query.market){
			const result = await this.db.getPrisma().gameBoard.findMany({
				where: { market:query.market },
			});
			return result;
		}
		else if(query.type){
			const result = await this.db.getPrisma().gameBoard.findMany({
				where: {type:query.type },
			});
			return result;
		}
		else return null;

	}

	//***************************************************************************** 
	async addToCard(id,user_id) {
		const result = await this.db.getPrisma().gameBoard.findFirst({
			where: { id:id },
		});
		if(result == null){
			return "Item not found";
		}
		let data ={
			user_id:user_id,
			item_id:result.id,
			name: result.name,
			createdBy: result.author,
			contract_add: result.contract_add,
			token_id: result.token_id,
			pieces: result.pieces,
			price: result.price
		}
		console.log(data);
		const result2 = await this.db.getPrisma().shoppingCard.create({
			data:data
		});
		return result2;
	    

	}

	//****************************************************************************** */
	async removeFromCard(id, user_id) {
		const result = await this.db.getPrisma().shoppingCard.deleteMany({
				where: {user_id:user_id , item_id:id },
		});
		return result;
	
	}
	//************************************************************************** */
	async bill(user_id) {
	    const result = await this.db.getPrisma().shoppingCard.findMany({
			where: {user_id:user_id},
	});
	return result;

	}
	//*************************************************************** */
    

  
}

module.exports = {
	GameBoardRepository
}
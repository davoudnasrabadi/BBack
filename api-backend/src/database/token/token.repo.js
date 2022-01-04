const { Prisma  }=require('@prisma/client');
const {database} = require('../../database/init');
 class TokenRepository {
	constructor() {
		this.db = database;
	}
	addMinutesToDate(date, minutes) {
		return new Date(date.getTime() + minutes*60000);
	}
	async add(data) {
		const result = await this.db.getPrisma().token.create({
			data,
		});
		return result;
	}

	async get(token) {
		const result = await this.db.getPrisma().token.findFirst({
			where: { token },
		});
		return result;
	}

	async delete(token){
		const result = await this.db.getPrisma().token.deleteMany({
			where: { token },
		});
		return result.count;
	}

	
}
module.exports = {
	TokenRepository
}
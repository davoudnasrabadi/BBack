const { Prisma  }=require('@prisma/client');
const {database} = require('../../database/init');
 class HistoryRepository {
	constructor() {
		this.db = database;
	}
	
	async add(data) {
        const result = await this.db.getPrisma().history.create({
			data: data,
		});
		return result;
	}

	async getForUserById(id,from,count) {
		const result = await this.db.getPrisma().history.findMany({
			where: { user_id:id },
		});
		let resp = [];
        let index=0;
        for(let i=from ; i<= from+count-1 ; i++){
            resp[index] = result[i];
            index++;
        }

        return resp;

	}

	async deleteAllForUserById(id){
		const result = await this.db.getPrisma().history.deleteMany({
			where: { user_id:id },
		});
		return result.count;
	}

    async deleteAllFailed(){
        const result = await this.db.getPrisma().history.deleteMany({
			where: { status:"Failed" },
		});
		return result.count;
    }


	
}
module.exports = {
	HistoryRepository
}
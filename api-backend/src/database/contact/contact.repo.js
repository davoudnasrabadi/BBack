const { Prisma  }=require('@prisma/client');
const {database} = require('../../database/init');
class ContactRepository {
	constructor() {
		this.db = database;
	}


	async insertMessage(data) {
        return new Promise(async (resolve,reject)=>{
            try{
                const result = await this.db.getPrisma().contact.create({
                    data: data,
                });
                resolve(result);
            }
            catch(err){
               reject(err.message);
            }
        })
 
	}


	async removeMesssages(){
        return new Promise(async (resolve,reject)=>{
            try{
                const result = await this.db.getPrisma().contact.deleteMany({});
                resolve(result.count);
            }
            catch(err){
               reject(err.message);
            }
        })
		
	}
    
	async getMessages(){
        return new Promise(async (resolve,reject)=>{
            try{
                const result = await this.db.getPrisma().contact.findMany();
                resolve(result);
            }
            catch(err){
               reject(err.message);
            }
        })
	}
    
    

}

module.exports = {
	ContactRepository
}

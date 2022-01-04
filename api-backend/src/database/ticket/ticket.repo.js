const { Prisma  }=require('@prisma/client');
const {database} = require('../../database/init');
class TicketRepository {
	constructor() {
		this.db = database;
	}


	async getAll() {
	   let all = [];
	   let finalRes = {};
	   finalRes.closetGame={};
	   finalRes.cup={};
	   finalRes.cup.times=[];
	   finalRes.superCup={};
	   finalRes.superCup.times=[];
	   finalRes.weekFinal={};
	   finalRes.weekFinal.times=[];
	   finalRes.monthFinal={};
	   finalRes.monthFinal.times=[];
       let res = await this.db.getPrisma().gameDate.findMany({});
	   res = res.sort((item1,item2)=>{
           return item1.time - item2.time;
	   })
	   finalRes.closetGame.type = res[0].type;
	   finalRes.closetGame.time = res[0].time;
	   finalRes.cup.prices ={
		   gold:15,
		   silver:10,
		   bronze:5
	   }
	   finalRes.superCup.prices ={
		gold:15,
		silver:10,
		bronze:5
	   }
	   finalRes.weekFinal.prices ={
		gold:15,
		silver:10,
		bronze:5
	   }
	   finalRes.monthFinal.prices ={
		gold:15,
		silver:10,
		bronze:5
	   }
	   for(let i =0;i<res.length;i++){
		   if(res[i].type == 'Cup'){
			   finalRes.cup.times.push(res[i].time);
		   }
		   if(res[i].type == 'Supercup'){
			finalRes.superCup.times.push(res[i].time);
		   }
		   if(res[i].type == 'Supercup'){
			finalRes.superCup.times.push(res[i].time);
		   }
		   if(res[i].type == 'Weekend Final'){
			finalRes.weekFinal.times.push(res[i].time);
		   }
		   if(res[i].type == 'Monthly Final'){
			finalRes.monthFinal.times.push(res[i].time);
		   }
	   }
       
	   finalRes.cup.times = finalRes.cup.times.sort((item1,item2)=>{
		   return item1-item2;
	   })
	   finalRes.superCup.times = finalRes.superCup.times.sort((item1,item2)=>{
		return item1-item2;
	   });
		finalRes.weekFinal.times = finalRes.weekFinal.times.sort((item1,item2)=>{
			return item1-item2;
		})
		finalRes.monthFinal.times = finalRes.monthFinal.times.sort((item1,item2)=>{
			return item1-item2;
		})

	   return finalRes;
	}

	//********************************************************************************

	async addTicket(data){
		console.log(data);
		let date = new Date(data.year , data.month , data.day , data.hour , data.minute);
		const type = data.type;

		const row = {
			type:type,
			time:date
		}

		const res = await this.db.getPrisma().gameDate.create({
			data:row
		})

		return res;

		
	}
    
	//***************************************************************************** 
	async remove(type) {
        result = null;
		
		result = await this.db.getPrisma().gameDate.deleteMany({
			where: { type:type },
		})
	    return result.count;
	}
	//******************************************************************************
	async removeAll(type) {
        result = null;
		
		result = await this.db.getPrisma().gameDate.deleteMany({
		})
	    return result.count;
	}
	//***************************************************************************** 

}

module.exports = {
	TicketRepository
}
const { Prisma  }=require('@prisma/client');
const {database} = require('../../database/init');
 class OtpRepository {
	constructor() {
		this.db = database;
	}
	
	async add(data) {
		const email = data.email;
		const result = await this.db.getPrisma().otp.upsert({
			where:{
				email:email
			},
			update:{
                otp:data.otp,
				project_id:data.project_id,
				type:data.type,
				expire_at:data.expire_at,
				verified:data.verified
			},
			create:{
                 otp:data.otp,
				 project_id:data.project_id,
				 type:data.type,
				 email:data.email,
				 expire_at:data.expire_at,
				 verified:data.verified
			}
		});
		return result;
	}

	async get(email) {
		const result = await this.db.getPrisma().otp.findFirst({
			where: { email:email },
		});
		return result;
	}

	async getByOtp(otp){
		const result = await this.db.getPrisma().otp.findFirst({
			select: {
				otp:true,
				email:true,
				expire_at:true
			    
			},
			where:{otp:otp},
		})
		return result;
	}

	async delete(email){
		const result = await this.db.getPrisma().otp.deleteMany({
			where: { email:email },
		});
		return result.count;
	}

	async deleteByOtp(otp){
		const result = await this.db.getPrisma().otp.deleteMany({
			where: { otp:otp },
		});
		return result.count;
	}
	
    async update(email,data){
        const result = await this.db.getPrisma().otp.update({
			data: data,
			where: { email:email},
		});
		return result.count;
    }

	
}
module.exports = {
	OtpRepository
}
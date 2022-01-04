const { Prisma  }=require('@prisma/client');
const {database} = require('../../database/init');
const bcrypt = require('bcrypt');
class UserRepository {
	constructor() {
		this.db = database;
	}

	async getAllUsersOfProject(project_id) {
	   
	}

	async getAllUsersOfProjectWithTags(project_id,paginate) {
		const result = await this.db.getPrisma().user.findMany({
			select: {
				user_id: true,
				first_name: true,
				last_name: true,
				last_signin: true,
				created_at: true,
	
			},
			skip: paginate?.offset ? paginate?.offset : undefined,
			take: paginate?.limit ? paginate?.limit : undefined,
		});

		return result;
	}

	async getCountUsersOfProject(project_id) {
	
	}

	async getMe(id) {
		const result = await this.db.getPrisma().user.findUnique({
			where: { user_id:id},
		});
		return result;
	}

	async getUserOfProject(project_id, user_id) {
		const result = await this.db.getPrisma().user.findFirst({
			select: {
				first_name: true,
				last_name: true,
				user_id: true,
				email: true,
				avatar: true,
				last_signin: true,
				created_at: true,
		
				
			},
			where: {user_id},
		});
		return result;
	}

	async getUserOfProjectByEmail(project_id, email) {
		const result = await this.db.getPrisma().user.findFirst({
			select: {
				first_name: true,
				last_name: true,
				user_id: true,
				email: true,
				avatar: true,
				last_signin: true,
				created_at: true,
			},
			where: { email},
		});
		return result;
	}
	async getUserOfProjectByGoogleId(project_id, googleid) {
		const result = await this.db.getPrisma().user.findFirst({
			select: {
				first_name: true,
				last_name: true,
				user_id: true,
				email: true,
				google_id:true,
				avatar: true,
				last_signin: true,
				created_at: true,
			},
			where: { project_id:project_id,google_id:googleid},
		});
		return result;
	}
	async getBulkUsersOfProject(project_id, user_ids) {
		const result = await this.db.getPrisma().user.findMany({
			select: {
				first_name: true,
				last_name: true,
				user_id: true,
				email: true,
				avatar: true,
				last_signin: true,
				created_at: true,
			
			},
			where: { user_id: { in: user_ids }},
		});
		return result;
	}

	async removeUserFromProject(project_id, user_id) {
		const result = await this.db.getPrisma().user.deleteMany({
			where: { user_id },
		});
		return result.count;
	}

	async removeUsersFromProject(project_id, user_ids) {
		const result = await this.db.getPrisma().user.deleteMany({
			where: { user_id: { in: user_ids } },
		});
		return result.count;
	}

	async getByEmail(email) {
		const result = await this.db.getPrisma().user.findFirst({
			where: { email},
		});
		return result;
	}

	async getProjecUserByIdOrEmail(project_id, user_id, email) {
		const result = await this.db.getPrisma().user.findFirst({
			where: {OR: [{ email, user_id }] },
		});
		return result;
	}

	async getProjecUsersByEmail(project_id, emails){
		const result = await this.db.getPrisma().user.findMany({
			where: {email: { in: emails } },
		});
		return result;
	}

	async getAttendeeByEmail(project_id, email){
		const result = await this.db.getPrisma().user.findFirst({
			where: { email },
		});
		return result;
	}

	async getByID(user_id,project_id) {
		const result = await this.db.getPrisma().user.findFirst({
			where: { user_id,project_id:project_id}
		});
		return result;
	}

	async getByIdAndProject(project_id, user_id) {
		const result = await this.db.getPrisma().user.findFirst({
			where: { user_id },
		});
		return result;
	}

	async getByEmailAndProjectID(email, project_id){
		const result = await this.db.getPrisma().user.findFirst({
			where: { email,project_id},
		});
		return result;
	}

	async updateByEmail(email,data) {
		const result = await this.db.getPrisma().user.update({
			data: data,
			where: { email:email},
		});
		return result.count;
	}

	async updateByEmail(email,data,) {
		const result = await this.db.getPrisma().user.updateMany({
			data: data,
			where: { email:email},
		});
		return result.count;
	}


	async updateUserOtp(project_id,email,data) {
		const result = await this.db.getPrisma().otp.updateMany({
			where: {email },
			data: data,
		});
		return result.count;
	}

	async updateMultipleByIDs(project_id,user_ids,data) {
		const result = await this.db.getPrisma().user.updateMany({
			data: data,
			where: {user_id: { in: user_ids } },
		});
		return result.count;
	}

	async updateByProjectID(project_id,user_id,data,
	){
		const result = await this.db.getPrisma().user.updateMany({
			data: data,
			where: { user_id},
		});
		return result.count;
	}

	async insertUser(data) {
		const result = await this.db.getPrisma().user.create({
			data: data,
		});
		return result;
	}


	async removeUserByEmail(email){
		const result = await this.db.getPrisma().user.deleteMany({
			where: { email },
		});
		return result.count;
	}
    
	async remove(user_id){
		const result = await this.db.getPrisma().user.deleteMany({
			where: { user_id },
		});
		return result.count;
	}

	//********************************************************************** 

	async insertUserOtp(data) {
		const result = await this.db.getPrisma().otp.create({
			data: data,
		});
		return result;
	}

	//******************************************************************** 

	async getUserOtp(project_id,email) {
		const result = await this.db.getPrisma().otp.findFirst({
			where: {email:email},
		});
		return result;
	}

	//****************************************************************** 

	async removeUserOtp(project_id, email) {
		const result = await this.db.getPrisma().otp.deleteMany({
			where: { project_id, email },
		});
		return result.count;
	}

	//**************************************************************** 


	async removeActiveSession(jti) {
		await this.db.getPrisma().$executeRaw`DELETE FROM user_active_session WHERE jti = ${jti}`;
	}

	//**************************************************************** 
	async createActiveSession(data){
		const result = await this.db.getPrisma().user_active_session.create({
			data,
		});
		return result;
	}

	//*************************************************************** 

	async removeUnverifiedUsers(){
		const res = await this.db.getPrisma().user.deleteMany({
			where:{verified:false}
		});
	}

	//***************************************************************** 

	async completeProfile(data, id){
		const result = await this.db.getPrisma().user.update({
			where: {user_id:id },
			data: data,
		});
		return result.count;
	}

	//****************************************************************** 
	async deleteImage(id){
		const data = {
			avatar:null
		}
		const result = await this.db.getPrisma().user.update({
			where: {user_id:id },
			data: data,
		});
		return result.count;
        
        

	}
	//***************************************************************** 

	async getMeForUser(id){
		id  = parseInt(id);
		const result = await this.db.getPrisma().user.findUnique({
			where: { user_id:id},
			select: {
				display_name: true,
                email:true,
				name:true,
				family:true,
				avatar:true,
				city:true,
				country:true
			},
		});
		
		return result;
	}

	//****************************************************************** 

	async charge(data, id){
		const result = await this.db.getPrisma().user.findFirst({
			where: { user_id:id},
			select: {
				amount:true
			},
		});
	    data = data + result.amount;
		let finalData = {
			amount:data
		}
		const finalResult = await this.db.getPrisma().user.update({
			where: {user_id:id },
			data: finalData
		});
		return finalResult;
	}

	//********************************************************************
    async disCharge(data, id){
		const result = await this.db.getPrisma().user.findFirst({
			where: { user_id:id},
			select: {
				amount:true
			},
		});
	    if(data>result.amount){
			return false;
		}
		data = result.amount-data;
		let finalData = {
			amount:data
		}
		const finalResult = await this.db.getPrisma().user.update({
			where: {user_id:id },
			data:finalData
		});
		return finalResult;
	}

	//********************************************************************* 
    async getAmount(id){
		const result = await this.db.getPrisma().user.findFirst({
			where: { user_id:id},
			select: {
				amount:true
			},
		});
		return result;
	}
	//********************************************************************* 
	async changePass(password,id){
		const encryptedPassword = await bcrypt.hash(password, 10);
		const finalData = {
			password:encryptedPassword
		}
		const finalResult = await this.db.getPrisma().user.update({
			where: {user_id:id },
			data:finalData
		});
		return finalResult;
	}
}

module.exports = {
	UserRepository
}



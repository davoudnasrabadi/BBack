const { Prisma  }=require('@prisma/client');
const {database} = require('../../database/init');
class TicketRepositoy {
	constructor() {
		this.db = database;
	}

	async getTicket(ticket_id) {
		const result = await this.db.getPrisma().ticket.findFirst({
			where: { ticket_id},
			select: {
				ticket_id: true,
				game_id: true,
				price: true,
				plan: true,

			},
		});
		return result;
	}

	

	async updateTicketById(ticket_id,data)
    {
		const result = await this.db.getPrisma().ticket.update({
			data: data,
			where: { ticket_id},
		});
		return result.count;
	}

	async insertTicket(data) {
		const result = await this.db.getPrisma().ticket.create({
			data: data,
		});
		return result;
	}


	async removeTicketById(ticket_id){
		const result = await this.db.getPrisma().ticket.delete({
			where: { ticket_id },
		});
		return result.count;
	}

    


}

module.exports = {
	TicketRepositoy
}



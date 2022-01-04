const {Plans} = require('./plans');
const {TicketRepositoy} = require('../../../../database/game/ticket.repo');
class Ticket {

    constructor(id,game_id,price,plan,game,users){
       this.ticket_id = id;
       this.game_id = game_id;
       this.price = price;
       this.plan = plan;
       this.game = game;
       this.users = users;
    }

    getTicket(){
        return this;
    }
    
    updateTicket(data){
      this.ticket_id = data.ticket_id;
      this.game_id = data.game_id;
      this.price = data.price;
      this.plan = data.plan;
      this.game = data.game;
      this.users = data.users;
      //then update on repo(database)
    }
}
module.exports = {
    Ticket
}
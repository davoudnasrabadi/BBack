const {UserRepository} = require('../../../../../database/user/user.repo');
const {validationResult} = require('express-validator');
const gcm = require('node-gcm');
class BigmomentNotificationService {
   
   constructor(){
      
      this.userRepo = new UserRepository();
    
   }
  
   //************************************
   async checkUser(req,res){
      const {email} = req.body;
      
      //first check to see if there is exisiting user before
     const user = await this.userRepo.getByEmailAndProjectID(email,1);
     return user;
   }

   async sendByEmail(email){
      
   }
   
   //************************************************************
   async loadNotifInfo(req,res){
       
       //get notification info according to the user from database
       const data = null;

   }
    
   //************************************************************* 
   async saveNotifSettings(req,res){
      //save notification object for current user 
      const errors = validationResult(req);
      if(!errors.isEmpty()){
         return res.status(400).json({msg:errors.array()});
      }
      try{
         const data = req.body;
         const resp = this.ticketRepo.remove(data);
         if(resp){
               return res.status(200).json({msg:'All tickets deleted successfully'});
          }
         else{
            return res.status(500).json({err:err.message});
         }

      }
      catch(err){
         return res.status(500).json({err:err.message});
      }

   }

   //************************************************************ 
   async sendNotificationAndroid(msg){
      // Set up the sender with your GCM/FCM API key (declare this once for multiple messages

        // Prepare a message to be sent
        var message = new gcm.Message({
            data: { key1: msg }
        });

        // Specify which registration IDs to deliver the message to
        var regTokens = ['YOUR_REG_TOKEN_HERE'];

        // Actually send the message
        sender.send(message, { registrationTokens: regTokens }, function (err, response) {
            if (err) console.error(err);
            else console.log(response);
        });
   }


   async sendNotificationIos(msg){
    let deviceToken = "a9d0ed10e9cfd022a61cb08753f49c5a0b0dfb383697bf9f9d750a1003da19c7"

    var options = {
        token: {
          key: "path/to/APNsAuthKey_XXXXXXXXXX.p8",
          keyId: "key-id",
          teamId: "developer-team-id"
        },
        production: false
      };
      
      var apnProvider = new apn.Provider(options);

      var note = new apn.Notification();

        note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
        note.badge = 3;
        note.sound = "ping.aiff";
        note.alert = "\uD83D\uDCE7 \u2709 You have a new message";
        note.payload = {'messageFrom': 'John Appleseed'};
        note.topic = "<your-app-bundle-id>";

        apnProvider.send(note, deviceToken).then( (result) => {
            // see documentation for an explanation of result
          });
   }
  
   
}

module.exports = {
    BigmomentNotificationService
}
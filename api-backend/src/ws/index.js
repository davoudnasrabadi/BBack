const queryString = require('query-string');
const WebSocket = require('ws');
const {addUserToStage,removeUserFromStage}  = require('../api/bigmoment/v1/game/game');
const {database} = require('../database/init');
module.exports =  async (expressServer) =>{
    
    const websocketServer = new WebSocket.Server({
        noServer:true,
        path: "/websockets",
      });
    expressServer.on("upgrade", (request, socket, head) => {
        websocketServer.handleUpgrade(request, socket, head, (websocket) => {
          websocketServer.emit("connection", websocket, request);
        });
    });
   
   //url for connection: ws://localhost:3001/websockets
    websocketServer.on(
        "connection",
        function connection(websocketConnection, connectionRequest) {
          const [_path, params] = connectionRequest.url.split("?");
          //const connectionParams = queryString.parse(params);
          console.log("ws connection ...")
    
          websocketConnection.on("message", (message) => {
            const parsedMessage = JSON.parse(message);
            //First processing  type of message
            let res = null;
            const type = parsedMessage.type;
            const data = parsedMessage.data;
            switch(type){
               case 'MOVE':
                 res = handleMove(data);
              
              case 'ENTER':
                res = handleUserEnterance(data);
              
              case 'EXIT':
                res = handleUserExit(data);
               

            }
            websocketConnection.send({res:res});
          });
        }
      );
      return websocketServer;

}

const handleMove = (data)=>{
   const {path,x,y} = data;
   const p = require('path');
   //First extract correct location ...
   const fileName = p.basename(path);
   //Then decode fileName
   const {decode} = require('../api/bigmoment/v1/game/utility');
   const strName = fileName.split('.')[0];
   const decodedName = decode(strName);

   let indexes = decodedName.split('-');
   let yloc = indexes[1];
   let xloc = indexes[2];
   if(xloc == x && yloc == y)
     return true;
   return false;
}

const handleUserEnterance =  (data)=>{
   //process enterance of a user and return all users
  addUserToStage(data.game_name,data.user_id)
  .then((res) => {
     database.getRedis().get(data.game_name,(err,result)=>{
       return result;
     })
    
  }).catch((err) => {
    console.log(err.message)
    throw err;
  });
  

}

const handleUserExit = (data) =>{

  //process exit of a user and return all users
  removeUserFromStage(data.game_name,data.user_id)
  .then((res) => {
      database.getRedis().get(data.game_name,(err,result)=>{
        return result;
      })
   
 }).catch((err) => {
    console.log(err.message)
    throw err;
 });
 

}
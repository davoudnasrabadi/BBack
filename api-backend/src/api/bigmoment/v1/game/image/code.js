const fs = require('fs');
const {encode} = require('../utility');
const codeNames = (gameName)=>{
    fs.readdir(__dirname+"/"+gameName,(err,files)=>{
        if(err)
          throw err;
        files.forEach((name)=>{
          if(!name.includes('data') && !name.includes('outline')){
          fs.renameSync(__dirname+"/"+gameName+"/"+name,__dirname+"/"+gameName+"/"+encode(name)+".png");
          }
        })
        
      })
       
      console.log('done');
  

}

codeNames(process.argv[2]);
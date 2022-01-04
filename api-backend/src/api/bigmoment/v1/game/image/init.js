const PythonShell = require('python-shell').PythonShell;
const {encode} = require('../utility');
const args = process.argv.slice(2);
const path = require('path');
const fs = require('fs');
const fileName = args[0];
const gameName = args[1];
const imgPath = __dirname+"/"+fileName;
const ext = path.extname(imgPath);
const xp = parseInt(args[2]);
const yp = parseInt(args[3]);
var options = {
    mode: 'text',
    pythonPath: '/usr/bin/python',
    pythonOptions: ['-u'],
    scriptPath: __dirname,
    args: [gameName, imgPath, xp,yp]
  };

  PythonShell.run('split.py', options, function (err, results) {
    if (err) 
      throw err;
  

    //then encode file names for security
    fs.readdir(__dirname+"/"+gameName,(err,files)=>{
      if(err)
        throw err;
      files.forEach((name)=>{
        fs.renameSync(__dirname+"/"+gameName+"/"+name,__dirname+"/"+gameName+"/"+encode(name)+ext);
      })
      
    })
     
    console.log('done');


  });



  //run:  python split.py gameOne machine.jpeg 3 4
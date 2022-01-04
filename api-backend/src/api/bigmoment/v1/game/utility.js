const { PuzzleRepository } = require('../../../../database/puzzle/puzzle.repo');

const checkIfEdge=(x,y,dims)=>{
    const xdim = dims.xdim;
    const ydim = dims.ydim;
    console.log(x,y,xdim,ydim)
    if(x ===0 || x=== xdim-1 || y===0 || y===ydim-1){
        return true;
    }
    return false;
 }

 
 const extracLocFromPath=(path_name)=>{
    const path = require('path');
    const file_name = path.basename(path_name);
    const ext = path.extname(path_name);
    let ar = file_name.split('-');
    let y = parseInt(ar[1]);
    let x = parseInt(ar[2].split('.')[0]);
    const res = {
        x,
        y
    }
    return res;
 }

 const encode = (str) =>{
     let buff  = Buffer.from(str);
     let output = buff.toString('base64url');
     return output;
 }

 const decode = (str)=>{
     let buff = Buffer.from(str,'base64url');
     let output = buff.toString('utf-8');
     return output;
 }
 module.exports = {
     checkIfEdge,
     extracLocFromPath,
     encode,
     decode
 }


 
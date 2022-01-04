const axios = require('axios');
const getCitiesByCountryName = (country)=>{
    return new Promise((resolve,reject)=>{
        axios({
            method:'post',
            url:'https://countriesnow.space/api/v0.1/countries/cities',
            data:{
                country:country
            }
        })
        .then((res)=>{
            resolve(res.data);
        })
        .catch(err=>{
            reject(err.message)
        })
    })
 }

 const getCountries = ()=>{
    return new Promise((resolve,reject)=>{
        axios({
            method:'get',
            url:'https://countriesnow.space/api/v0.1/countries',
            
        })
        .then((res)=>{
            const arr = res.data.data;
            let resp=[];
            for(let i=0;i<arr.length;i++){
                resp.push(arr[i].country);
            }
            resolve(resp);
        })
        .catch(err=>{
            reject(err.message)
        })
    })
 }
 module.exports ={
     getCountries,
     getCitiesByCountryName
 }
import fs from 'fs'
// const fs = require("fs");
fs.writeFile("data.txt","hello Dragon Boss", function(err){
    if(err){
        console.log("Error:",err)
    }
    else{
        console.log("File Created Succesfully..")
    }
})
// const { useCallback } = require("react")

function uplode(callback){
    console.log("Uploding.....");
    setTimeout(callback,2000);
}

uplode(function(){
    console.log("Uplode compled");
})
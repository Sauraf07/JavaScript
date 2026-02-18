function trackorder(callback){
    setTimeout(()=>{
        console.log("order preparing....")
        callback();
    },1000);
}
 trackorder(function(){
    setTimeout(() => {
        console.log("out of delevery..");
        setTimeout(()=>{
            console.log("Delvered....")
        },1000)
        
    }, 1000);
 })
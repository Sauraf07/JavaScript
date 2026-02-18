function registration(name,callback){
    if (name == ""){
        console.log("Name required...")
    }
    else{
        callback();
    }
}

registration("Saurav ",function(){
    console.log("registration Success")
})
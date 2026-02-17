function validation(input,callback){
    if (input ==""){
        console.log("Field Required");
    }
    else{
        callback();
    }
}

validation("Dragon Boss", function(){
    console.log("form submitted");
})
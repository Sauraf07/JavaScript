function checkmarks(marks,callback){
    if (marks>= 40){
        callback("Pass");
    }
    else{
        callback("fail")
    }
}

checkmarks(20,function(result){
    console.log(result)
})
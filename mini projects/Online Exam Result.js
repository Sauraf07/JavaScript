function examresult(marks){
    return new Promise(function(resolve,reject){
        if (marks >= 33){
            resolve("you pass....")
        }
        else{
            reject("You failed")
        }
    });
}
examresult(45)
.then(res => console.log(res))
.catch(err => console.log(err))
function transection(balance){
    return new Promise(function(resolve,reject){
        if (balance >= 1000){
            resolve("Transection sucess");
        }
        else{
            reject("insuffient balanvce")
        }
    })

}
transection(500)
.then(res => console.log(res))
.catch(err => console.log(err))
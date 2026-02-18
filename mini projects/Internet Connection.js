function checkConnection(status){
    return new Promise(function(resolve,reject){
        if(status){
            resolve("Connected..")
        }
        else{
            reject("No internet")
        }
    })
}
checkConnection(true)
.then(res => console.log(res))
.catch(err => console.log(err))
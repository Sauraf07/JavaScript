function payment(status){
    return new Promise(function(resolve,reject){
        setTimeout (function(){
            if (status){
                resolve("PAyment Sucesss")
            }
            else{
                reject("payment Failed..")
            }
        },2000)
        })
}
payment(true)
.then(result => console.log(result))
.catch(error => console.log(error))
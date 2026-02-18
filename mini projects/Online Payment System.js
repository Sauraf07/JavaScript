function payment(status){
    return new Promise((resolve,reject)=>
    {
        setTimeout(() => {
            if (status){
                resolve("payment successful...");
            }
            else{
                reject("Payment failed");
            }
            
        }, 2000);
    })
}

payment(true)
.then(res => console.log(res))
.catch(err => console.log(err))
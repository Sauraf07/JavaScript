function paymment(status){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
              if (status){
            resolve("Payment Succesfull...")
        }
        else{
            reject("Payment Failed...")
        }
        }, 2000);
      
    })
}

async function processpayment() {
    try{
        let result = await paymment(true);
        console.log(result);
    }
    catch(error){
        console.log(error)
    }
}
processpayment()
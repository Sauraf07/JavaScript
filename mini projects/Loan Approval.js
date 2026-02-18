function checkloan(salary){
    return new Promise(function(resolve,reject){
        if (salary >= 20000){
            resolve("LONE Approve...")
        }
        else{
            reject("NOt approve..")
        }
    })
}

checkloan(5000)
.then(res => console.log(res))
.catch(err => console.log(err))
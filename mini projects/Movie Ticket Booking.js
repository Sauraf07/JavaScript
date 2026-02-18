function bookTicket(seats){
    return new Promise((resolve,reject)=>
    {
        setTimeout(()=>
        {
            if(seats >0){
                resolve("Ticket Conformed...")
            }
            else{
                reject("House full..")
            }
        },2000)
    })
}
bookTicket(5)
.then(rev => console.log(rev))
.catch (err => console.log(err))
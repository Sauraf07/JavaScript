function orderFood(){
    return new Promise(resolve =>{
        setTimeout(()=>{
            resolve("Food Delivary... ");
        },3000)
    })
}
async function trackorder() {
    console.log("order placed..");
    let result = await orderFood();
    console.log(result);
    
}
trackorder();
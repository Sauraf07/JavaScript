function getdata(){
    return new Promise((resolve)=>{
        setTimeout(() => {
            resolve("Data Loded.....")
        }, 2000);
    })
}

async function showdata() {
    let result = await getdata();
    console.log(result)
    
}
showdata()
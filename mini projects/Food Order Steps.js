setTimeout(()=>{
    console.log("order taken");
    setTimeout(()=>{
        console.log("cooking");
        setTimeout(()=>{
            console.log("Delivered");
        },1000)
    },1000)
},1000)
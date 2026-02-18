function sendOTP(callback){
    console.log("Sending OTP...")
    setTimeout(()=>{
        console.log("OTP Sent..")
        callback()
    },2000)
}

sendOTP(function(){
    console.log("OTP Verified..")
})
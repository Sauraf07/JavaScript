function downloadFile(callback){
    console.log("Downloading....");
    setTimeout(() => {
        console.log("Downloaded COmpleted..")
        callback()
    }, 2000);
}

downloadFile(function(){
    console.log("File is Ready To Open")
})
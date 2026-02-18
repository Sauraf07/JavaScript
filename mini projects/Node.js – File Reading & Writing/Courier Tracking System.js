function TrackParcal(callback){
    console.log("parcal Packed..")
    setTimeout(function(){
        console.log("Parcal Shifted..")
        callback()
    },2000)

}
TrackParcal(function(){
    setTimeout(function(){
        console.log("parcel delivered...")
    },2000)
})
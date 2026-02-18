class Student{
    constructor(marks){
        this.marks = marks;
    }
    getResult(){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                if(this.marks >= 33){
                    resolve("You Pass")
                }
                else{
                    reject("you fail")
                }
            },2000)
        })
    }
}
async function check() {
    let s1 = new Student(40);
    try{
        let result = await s1.getResult()
        console.log(result);
    }
    catch(error){
        console.log(error)
    }
    
}
check()
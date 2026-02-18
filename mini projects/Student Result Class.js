class Students{
    constructor(name,marks){
        this.name = name;
        this.marks = marks;

    }
    checkresult(){
        if (this.marks>=33){
            return `${this.name} Is Pass`;

        }
        else{
            return `${this.name} Is Fail`;
        }
    }
}
let s1 = new Students("Dragon Boss", 99);
console.log(s1.checkresult());

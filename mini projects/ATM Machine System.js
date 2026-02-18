class ATM{
    constructor(balance){
        this.balance = balance;
    }
    checkbalance(){
        console.log("Balance:",this.balance);

    }
    widwarl(amount){
        if (amount <= this.balance ){
            this.balance -= amount;
            console.log("widwarl sucess. New balance ",this.balance);
        }
        else{
            console.log("insuffient Balance..")
        }
    }
}
 
let user1 = new ATM(10000);
user1.checkbalance();
user1.widwarl(3000)
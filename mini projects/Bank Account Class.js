class BankAccount{
    constructor(balance){
        this.balance = balance;
    }
    diposit(amount){
        this.balance += amount;
        console.log("New Balance:", this.balance);
    }
    widhwarl(amount){
        if(amount <= this.balance){
            this.balance -= amount;
            console.log("widral sucess:", this.balance);
        }
        else{
            console,log("insuffient balance");
        }
    }
}
let acc = new BankAccount(5000);
acc.diposit(2000);
acc.widhwarl(3000);

class BankAccount{
    constructor(balance){
        this.balance = balance;
    }
    deposit(amount){
        this.balance += amount;
        console.log("new Balance: ",this.balance);
    }

    withdraw(amount){
        if(amount <= this.balance){
            this.balance -= amount;
            console.log("Widthwarl sucesss:",this.balance);
        }
        else{
            console.log("Insuffient Balnace.. ")
        }
    }
}
let acc = new BankAccount(5000);
acc.deposit(2000)
acc.withdraw(3000)
class Car {
    constructor(brand = 'Unknown', speed = 0) {
        this.brand = brand;
        this.speed = speed; // km/h
    }

    accelerate(amount = 10) {
        this.speed += amount;
        return this.speed;
    }

    brake(amount = 10) {
        this.speed = Math.max(0, this.speed - amount);
        return this.speed;
    }

    toString() {
        return `${this.brand} running at ${this.speed} km/h`;
    }
}

// Example usage
const car = new Car('Toyota', 50);
console.log(car.toString());
car.accelerate(20);
console.log('After accelerate:', car.speed);
car.brake(30);
console.log('After brake:', car.speed);
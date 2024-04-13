class Animal{
    constructor(name, legCount, speaks){
        this.name = name;
        this.legCount = legCount;
        this.speaks = speaks;
    }
    
    
    speak(){
        console.log(" hi there " + this.speaks);
    }
}

let dog = new Animal("dog", 4, "bhow bhow") // creating object
let cat = new Animal("cat", 4, "meow");

dog.speak() // calling function on an object
cat.speak()
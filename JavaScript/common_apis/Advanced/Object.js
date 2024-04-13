function objectMethods(obj){
    console.log("Original object: ", obj);

    let keys = Object.keys(obj);
    console.log("After Object.keys(): ", keys);

    let values = Object.values(obj);
    console.log("After Object.values(): ", values);

    let entries = Object.entries(obj);
    console.log("After Object.entries(): ", entries);

    let newObj = Object.assign({}, obj, { newProperty: 'newValue'});
    console.log("After Object.assign(): ", newObj); // creates a new object
}

let obj = {
    key1: 'value 1',
    key2: 'value 2',
    key3: 'value 3',
}

objectMethods(obj)
console.log(obj);
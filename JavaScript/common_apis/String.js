function getLength(str){
    console.log("Original String: ", str);
    console.log("Length: ", str.length);
}

getLength("Hello World!");

function findIndexOf(str, target){
    console.log("Original string:", str );
    console.log("Index: ", str.indexOf(target)); // gives index of first occurrence
    console.log("Last Index: ", str.lastIndexOf(target)); // gives last Index
}

findIndexOf("Hello World World", "World")

str = "Hello World"

// slice
console.log("Slice: ", str.slice(0, 5));
console.log("Replace: ", str.replace("World", "Duniya"));

const words = str.split(" ");
console.log(words)

console.log("Lower Case: ", str.toLowerCase())

console.log("ParseInt: ")
console.log(parseInt("42"));
console.log(parseInt("42px"));
console.log(parseInt("aa42px")); // will give Nan
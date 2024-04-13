const intitialArray = [1, 2, 3]

intitialArray.push(4)
console.log(intitialArray);

// push at the beginning
intitialArray.unshift(0)
console.log(intitialArray);

// pop
intitialArray.pop()
console.log(intitialArray)

// pop rfom beginning
intitialArray.shift()
console.log(intitialArray);

// concat
console.log("Concat: ")
const secondArray = [7, 8, 9];

finalArray = intitialArray.concat(secondArray)
console.log(finalArray)

// forEach
function logThing(str){
    console.log(str);
}
intitialArray.forEach(logThing) // forEach says whatever func you give me, I'll call that fro every element of the array

// map, filter, find, sort


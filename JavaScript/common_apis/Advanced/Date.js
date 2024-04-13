const current_date = new Date()

console.log(current_date.getDate())
console.log(current_date.getFullYear());
console.log(current_date.getMonth() + 1) // because it's 0-indexed

console.log(current_date)

// setting components of the date
// current_date.setFullYear(2023);
// console.log(current_date.getFullYear())

console.log("Time in milliseconds since 1970: ", current_date.getTime());

// calculating execution time of a function

function calculateSum(){
    let a = 0;
    for(let i = 0; i < 1000000000; i = i + 1){
        a = a + 1;
    }
    return a;
}

const beforeDate = new Date()
const beforeTimeInMins = beforeDate.getTime();
calculateSum()

const afterTime = new Date()
const afterTimeInMins = afterTime.getTime();

console.log(afterTimeInMins - beforeTimeInMins);

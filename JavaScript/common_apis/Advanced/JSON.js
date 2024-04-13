const users = '{"name": "Akash","age": 24,"gender": "male"}'

// This is an javascript object, what if we want to send this data somewhere? We will convert this to string and send, right?
// JSON helps us to do that



// const user = '{name: "Akash", age: 24, gender: "male"}'

// console.log(user) // this is a string now, we cannot access name of user as user['name']

// JSON.parse, JSON.stringify



const user = JSON.parse(users); // converts to js object
console.log(user)

const user_string = JSON.stringify(user) // converts js object to string
console.log(user_string);

// In applications, we get data in string format, we can convert that into JS object and access the variables
// And, whenever we send some data, we always convert it to string and don't send as an object, because we don't know it they understand objects, but everyone understands strings!

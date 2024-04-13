console.log("Hi");
let ans = 0;

for (let i = 0; i <= 100; i = i + 1) {
  ans += i;
}

// console.log(ans);

const users = [
  {
    name: "John",
    age: 30,
  },
  {
    name: "Jane",
    age: 30,
  },
  {
    name: "Bob",
    age: 40,
  },
];

for (let i = 0; i < users.length; i = i + 1) {
  if (users[i]["age"] == 30) {
    console.log(users[i]["name"]);
  }
}

function findSum(a, b, fnToCall){
  let result = a + b
  fnToCall(result)
};

// fnToCall is a callback function

function displayResult(data){
  console.log('Result of the sum is: ' + data)
}

const res = findSum(1, 2, displayResult)
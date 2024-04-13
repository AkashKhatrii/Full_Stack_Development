### JavaScript
   - JS is a single threaded application, means a js process can only be executed on a single thread, it can't utilize multiple threads to execute different parts of the program at the same time
  
1. Variables: `var, let, const`
2. Synchronous vs Asynchronous
   - All code we have written till now that runs line by line (hence synchronous)
   - Code that runs in the background (hence async)
    - async functions in programming are those that allow a program to start a potentially long running operation and continue executing other tasks without waiting for the long running operation to complete. Particularly useful in environments like web browsers or node.js, where waiting for an operation to finish 9like fetching data from a server or reading a large file) could make the application unresponsive.
3. Callback Functions
    - A function passed as an argument to another function
```javascript
function calculateArithmetic(a, b, fnToCall) {
    const ans = fnToCall(a, b);
    return ans;
  }
  
  function sum(a, b) {
    return a + b;
  }
  
  function sub(a, b) {
    return a - b;
  }
  let res = calculateArithmetic(1, 2, sub);
  console.log(res);
``` 
Here, `sum` and `sub` are callback functions passed as an argument to `calculateArithmetic` function and this function calls the callback functions.

#### Synchronous vs Asynchronous
1. Synchronous
> Together, one after the other, sequential. Only one thing at a time.

2. Asynchronous
> Opposite of asynchronous. Happens in parts. Multiple things are context switching with each other.
> Basically, we give a task to someone else to finish it and return us the result.

##### Async functions vs sync functions
Human brain and body is single threaded.
1. We can only do one thing at a time.
2. But we can context switch b/w tasks, or we can delegate tasks to other people.
   
**This is same for JavaScript, it is single threaded, but can context switch.**

**Important**
1. Whenever we have a synchronous function, we have to wait for it to complete before we can move on to another task.
2. When we have an async functions, we can delegtae the task to another thread (different from the current main thread).

*Synchronous function*
```javascript
function findSum(n){
  let ans = 0;
  for (let i = 0; i < n; i ++){
    ans += i;
  }
  return ans;
}

console.log(findSum(1000));
```
While the javascript thread is executingthis function, it cannot do another task.

*Asynchronous function*
```javascript
function findSum(n){
  let ans = 0;
  for (let i = 0; i < n; i ++){
    ans += i;
  }
  return ans;
}

function findSumTill100(){
  return findSum(100);
}

setTimeout(findSumTill100, 1000);
console.log("Hello World");
```
Here, `setTimeout` is an asynchronous function, it starts executing the function `findSumTill100` passed to it after `1000` milliseconds.

How is this asynchronous?
> JavaScript doesn't wait for `1000` milliseconds on that line, instead goes to the next line!

**Some common async functions**
1. fs.readFile - to read a file from your filesystem
2. fetch - to fetch data from api endpoints

**How are async functions executed**
1. Let's uderstand with the help of `setTimeout` async functions.
2. There are `4` things in a JS environment, `Call stack`, `Web Apis`, `Callback Queue` and `Event loop`.
3. When a js file is running, all the functions and operations are put on the `Call stack`, while `setTimeOut` function is put in `Web Apis` and waits there till the specified amount of time is finished, and after that it is added to the `Callback Queue` which includes completed async functions to be executed.
4. Why still in the `Callback Queue` and not directly execute it? because JS thread might be busy with other things, and until and unless it finishes those, it cannot execute other things.
5. When the thread is idle, the `Event loop` sees if any func is waiting in the `Callback Queue`, if yes, it is executed.

#### Promises
> It's just syntactic sugar, and still uses callbacks under the hood.
> It is just a class that makes callbacks and async functions slightly more readable.
> Whenevr, we create it, we need to pass in a function as the frst argument which has resolve as the first argument.

##### Without Promise
```javascript

const fs = require('fs');

// my own asynchronous function
function KiratsReadFile(cb){
    fs.readFile('a.txt', 'utf-8', function(err, data){
        cb(data);
    })
}

// callback function to call
function onDone(data){
    console.log(data);
}

kiratsReadFile(onDone);
```

1. Here, we are giving a task to another thread (i.e an async function).
2. When that async function has completed its task, it executes the callback we passed i.e. prints the data on the console.

##### With promise
```javascript
const fs = require('fs');

// my own asynchronous function
function KiratsReadFile(){
    return new Promise(function(resolve){
        fs.readFile('a.txt', 'utf-8', function(err, data){
            resolve(data);
        })
    })
}

// callback function to call
function onDone(data){
    console.log(data);
}

kiratsReadFile().then(onDone)
```
1. Here also, we are creating an async function, and when called, it immediately returns a promise, which may or may not be resolved later.
2. If resolved, it passes the data to the callee and then the callee can do `.then(cb)` to print the data.

```javascript
let p = new Promise(function(resolve){
    // place for the writer of the async function to do their magic(eg.get ketchup) and call resolve at the end with data
    resolve('hi there');
})

p.then(() => {
    console.log(p);
})
```

**Our own asynchronous functions will mostly be wrappers around inherent async functions like `setTimeOut` or `fetch`, etc.**

#### Async await

```javascript
function kiratsAsyncFunction(){
    let p = new Promise(function(resolve){
        // do some async logic here

        setTimeout(function(){
            resolve('hi there!');
        }, 3000);

    })
    return p;
}

async function main(){
    // no callbacks, no .then syntax
    // kiratsAsyncFunction().then(function(value){
    //    console.log(value);
    // })

    let value = await kiratsAsyncFunction();
    console.log(value);
    console.log('hi there1');
}

main();
console.log('after main');
```

> When we call `main()`, the function calls `kiratsAsyncFunction()` and waits until the promise is resolved, and when resolved, the variable `value` will contain the result of the promise.
> Then, the line after the variable `value` will be executed and `hi there1` will be printed.
> Does this mean, the thread is stopped until the promise resolves? No! After calling `main()`, the line after it is executed, i.e `after main` is printed and whenever the promise is resolved, then `hi there!` is printed. 
> That means, the rest of the program continues executing. 

The console will look like:
>after main
>hello there!
>hello there1

**Important**
1. An await can only be used inside an async function.
2. Any function that needs to use await, needs to be async.
3. Rather than using the .then syntax, we add await before and get the final value in the variable.

  
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


### Namaste JavaScript

##### How JavaScript works?
- Everything in JavaScript happens inside an Execution Context
- EC is like a big box with 2 components: `Memory` where all variables and functions are stored and `Code` where code is executed one line at a time.
- JS is s synchronous single-threaded language.


##### How JS code is executed?
- When we run a JS code, EC is created.
- It is created in 2 phases: `Creation` and `Code Execution`
- In `Creation`, memory is allocated to vars and functions. vars are stored as undefined, and functions are stored as a whole with the definitions.
- In `Code Execution`, executes code one line at a time.
- When a function is invoked, a new EC is ccreated with its own `Memory` and `Code`.
- This everything, EC creation, deletion and all is managed by `Call stack`. First, `Global EC` is passed on the stack.
- Call Stack maintains the order of execution of execution contexts.


##### Hoisting
- we can reference or access the vars and functions before their initialization.
- Why? beacuse memory is allocated to them in `Creation` phase.


```javascript
var x = 7;

function getName(){
  console.log('Namaste JavaScript');
}

getName(); // prints Namaste JavaScript
console.log(x); // prints 7
```

```javascript

getName(); // prints Namaste JavaScript
console.log(x); // prints undefined
console.log(getName); // prints the definition of the function

var x = 7;

function getName(){
  console.log('Namaste JavaScript');
}

```


##### undefined vs not defined
- we know, in `Creation` phase, memory is allocated to vars
- `undefined` is a special keyword assigned as a placeholder value for the vars in this phase.
- While, if we try to access something which was not declared in the program, it gives not defined.


##### Scope

```javascript
function a(){
  var b = 10;
  c();

  function c(){
    console.log(b);  // prints 10
  }
}

a();
console.log(b) // prints not defined
```

- `c()` is lexically inside `a()` and `a()` is lexically inside the global execution context.
- whenever an EC is created for a function, a lexical environment is also created.
- `lexical environment`: local memory + reference to lexical environment of the parent.



- JS engine tries to find `b` in the local memory of `c()`, but its not present, so then it goes to the lexical environment of its parent `a()` and continues.
- If we never defined `b` anywhere, then it gives not defined.


**This upper part, everything is called scope chain (chain of lexical environments)**


##### let & const
- let & const declarations are hosted but in a different way (they are in temporal dead zone)

```javascript
console.log(a); // referenceError: cannot access before initialization
console.log(b); // undefined

let a = 10;
var b = 100;
```

**Temporal Dead Zone**
- time since when the let variable was hoisted and till it is initialized some value.



##### Block scope & shadowing in JS
- block is:
```javascript
{


}
```

- block groups multiple statements so that we can use it in a place where JS expects a single statement.

- block scope means what all variables and functions we can access inside the block
- let & const are block scoped, i.e hoisted in a different section called `Block` while var is hoisted in the `Global` section



##### Closures

```javascript
function x(){
  var a = 7;
  function y(){
    console.log(a);
  }

  y(); // prints 7
}
```

**This is what closure is☝🏻!**

> Function along with its lexical scope forms a closure.


```javascript
function x(){
  var a = 7;
  function y(){
    console.log(a);
  }
  
  return y;
}

var z = x();
console.log(z); // prints function definition

//......

z(); // prints 7!!!
```

- Here, after `x()` is done exeuting, its EC is vanished and `a` was present in its EC.
- Now, when `z` is called, it still prints 7. How?? Ans: A function remebers its lexical environment from where it came.
- So, when `y` is returned from `x()`, not only the function is returned, but a closure is returned and we know, closure encloses function with its lexical environment.
- And, `y` remembres the reference to `a`.

**So, What is a closure?**
- Function along with its lexical scope bundled together forms a closure.


##### setTimeout + Closures

Suppose, we want to print 1 after 1s, 2 after 2s, and so on till 5. How do we do this?

- Solution:

```javascript
function x(){
  for(var i = 1; i <= 5; i ++){
    setTimeout(function(){
      console.log(i);
    }, i * 1000);
  }
}

x();
```

**What is printed on the console?**
> 6
> 6
> 6
> 6
> 6


**Why?**
- Because, the function (callback) passed to setTimeout is a closure, it remembers the reference to the variable `i`, and by the time these functions are put on call stack and ran, the value of `i` is changed to 6, therefore 6 is printed.


**Solution - use let instead of var**
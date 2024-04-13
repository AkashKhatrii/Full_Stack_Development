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




  
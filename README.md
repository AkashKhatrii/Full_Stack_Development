## Node.js and stuff

#### What is ECMAScript?
1. ECMAScript is a scripting language specification on which JavaScript is based.
2. Whoever is implementing a JS compiler/intrepreter, include all this!
3. ECMAScript versions (ES5, ES6, etc.) are essentially updates to the specification, introducing new features and syntaxes. For example, ES6 introduced arrow functions, classes, and template literals.

#### What is JavaScript?
1. JS is a scripting language that conforms the ES speicifcation.
2. Beyond ES: JS includes additional features that are not a part of ES, like the DOM manipulation, which is crucial for web dev but is not defined by ES.
   
**Common JS Browser engines**
- V8 - Used by google chrome
- SpiderMonkey - Used by Firefox
  
#### What is Node.js?
- Some smart people took out the V8 engine, added some Backend things (like fileSystem reads, create HTTP servers) on top to create a new runtime to compete with Backend languages like Java.
- JS was never meant to be run in the backend, but eventually became very popular.
  
#### What is Bun?
- Other than the fact that JS is single threaded, Node.js is slow (multiple reasons), some smart people said they wanted to re-write the JS runtime for the backend and introduced Bun.
- It is significantly faster runtime.

#### What is an HTTP server
- Hyper Text Transfer Protocol
    - A protocol that is defined for machines to communicate
    - Specifically for websites, it is the most common way your website's frontend to talk to its backend.
- HTTP Server
  - Some code that follows the HTTP protocol and is able to communicate with clints(browsers/mobile apps, ..)

##### Things client needs to worry about
1. Protocol (HTTP/HTTPS): which type of request the client is sending
2. Address (URL, Ip, Port)
3. Route
4. Headers (cookies, etc), Body (usually JSON), Query Params
5. Method (GET, POST, PUT, etc)
   
##### Things server needts to worry about
1. Response Headers
2. Response Body
3. Status code


### Express
1. To create a HTTP server, we use Express library.
2. To use Express, create a folder, in my case `Express`, `npm init` in the folder, that will create a `package.json` in our folder.
3. To bring *express* library onto our local achine, we do `npm install express`.
4. We create an application which listens to http requests (basically our http server) by doing `const app = express()`
5. Then we make this server listen to requests on a specific port, in this case, `3000` as `app.listen(3000, function(){ console.log('This is a server!')})`

**A simple server**
```javascript
const fs = require("fs");
const express = require("express")
const port = 3000

const app = express();
app.get('/', function(req, res){
    res.send('Hello World!');
})

app.listen(port, function(){
    console.log('This is a new server!');
})
```


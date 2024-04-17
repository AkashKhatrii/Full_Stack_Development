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

**Important**
- Express doesn't hande the `body` of the response, i.e if we try to print `req.body`, it will give `undefined`. Weird! But it's how express is built.
- To deal with this, external libraries are used. For eg. `body-parser`.


##### query-params
`http://localhost:3000/conversations?message=123&b=1`, every `key=value` pair after `?` in the url are called query parameters.

###### What is the use of query-params?
- Whenever we are sending a `GET` request, there is no easy wa for us to pass some body or data, so query-params are used in such cases.

Eg. `http://localhost:3000/messages?sort=-1`, sorts the results in descending order.

#### Middlewares

1. How do we do auth checks?
2. Ensure input by the user is valid.

Ex. without middlewares

```javascript
app.get('/health-checkup', function (req, res){
    // do health checks here

    const kidneyId = req.query.kidneyId;
    const username = req.headers.username;
    const password = req.headers.password;

    if (username != 'akash' || password != 'pass'){
        res.status(403).json({
            msg: 'user doesn't exist',
        })
        return;
    }

    if (kidneyId != 1 && kidneyId != 2){
        res.status(411).json({
            msg: 'wrong inputs',
        })
        return;
    }

    res.send('Your heart is healthy');
})
```

**What if all my routes have this logic of validating inputs and performing checks?**

- create wrapper fns `usernameValidator` and `kidneyValidator` and call them in the routes.
- But, still, it's a lot of code, i.e calling these in everyroute and performing checks

**Then, what is the solution? -> `Middleware`**

```javascript
function userMiddleware(req, res, next){
    if (username != 'akash' || password != 'pass'){
        res.status(403).json({
            msg: 'user doesn't exist',
        })
        return;
    } else{
        next();
    }
}

function kidneyMiddleware(req, res, next){
    if (kidneyId != 1 && kidneyId != 2){
        res.status(411).json({
            msg: 'wrong inputs',
        })
        return;
    } else {
        next();
    }
}

app.get('/health-checkup', userMiddleware, kidneyMiddleware, function (req, res){
    // do something here

    res.send('Your heart is healthy.');
})
```

**Few Important points**
1. You can pass as many callback functions to route handlers as you want.
2. `function (req, res, next)`, here next is called when all the checks are performed and we are good to go! Basically, `next()` calls the next middleware after the current one.
3. We odn't need `next` in the last callback function.
4. If we do `app.use(some_middleware)`, then this `some_middleware` middleware will be executed for every request.


> Our backend server is out on the internet, anyone can hit it, and therefore it's necessary to perform input validation checks to make sure the input is in the format which server can handle.
> If the input is not in that format, then the server will crash and it will reveal a lot of private info to the user. i.e Someone can read the exception caused by server.

**One way to handle these exceptions is a middleware called global catches**
- This middleware is added at the end of all the routes and it takes 4 parameters.

```javascript
app.use(function(err, req, res, next){
    res.json({
        msg: 'Sorry something is up with the server.'
    })
})
```

- If there is some exception caused by any of the routes above this, it catches them and sends this response.


### Input Validation

##### How can you do better input validation?
```javascript
if (kidneyId != 1 && kidneyId != 2){
    return false;
}
```

- This is very hard to scale. What if we expect a complicated input?
- What if we need to perform multiple checks? It becomes messy!

**How do we do input validation then? -> Zod!**

- Zod is very popular and is used for input validation.

```javascript
const schema = zod.array(zod.number())

// {
//      email: string => email
//      password: atleast 8 charaacters
//      country: "IN", "US"
// }

const registerSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
    country: zod.literal("IN").or(zod.literal("US")),
    kidneys: zod.array(zod.number())
})

app.get('/', function (req, res){
    res.send('This is zod tutorial!')
})

app.post('/health-checkup', function (req, res){

    const kidneys = req.body.kidneys;
    // const kidneysLength = kidneys.length;
    const response = schema.safeParse(kidneys);

    if (!response.success){
        res.json({
            msg: 'Invalid input'
        })
    } else {
    res.send({
        response
    })
}
    
})

app.listen(3000, (req, res) => {
    console.log('Listening on port 3000')
})
```

Here, `schema` is the datatype we want our input should be of. `const schema = zod.array(zod.number())` creates a `schema` that we can use to check our input. Here, it checks, if th einput is an `array` of `numbers`.




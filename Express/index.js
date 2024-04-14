const fs = require("fs");
const express = require("express")
const bodyParser = require("body-parser");
const port = 3000

const app = express();
app.use(bodyParser.json()); // any time body has some json, this handles it.
app.get('/', function(req, res){
    res.send('Hello World!');
})

app.post('/conversations', function(req, res){
    console.log(req.body);
    res.send({
      msg: "2 + 2 = 4" 
    })
  })
  

app.listen(port, function(){
    console.log('This is a new server!');
})
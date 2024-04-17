const express = require('express')
const jwt = require('jsonwebtoken')
const jwtPassword = '123456'; // secret
app = express()

const ALL_USERS = [
    {
    username: 'akash@gmail.com',
    password: 'abc',
    name: 'Akash Khatri',
    },
    {
    username: 'harkirat@gmail.com',
    password: '12321',
    name: 'Harkirat Singh',
    },
    {
    username: 'sohail@gmail.com',
    password: '1233321',
    name: 'Sohail Gidwani',
    }
]
app.use(express.json())

function userExists(username, password){
    for (let i = 0; i < ALL_USERS.length; i ++){
        if (ALL_USERS[i].username == username){
            if (ALL_USERS[i].password == password){
                return true;
            }
        }
    }

    return false;
}

app.post('/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!userExists(username, password)){
        return res.status(403).json({
            msg: "User doesn't exist in our in-memory db"
        })
    } 

    var token = jwt.sign({username: username}, jwtPassword);
    return res.json({
        token
    })
})

app.get('/users', (req, res) => {
    const token = req.headers.authorization;

    try{
        const decoded = jwt.verify(token, jwtPassword); // this throws an exception, can use global catch middleware too to catch this!
        const username = decoded.username;

        res.json({
            users: ALL_USERS.filter((value) => {
                if (value.username == username){
                    return false;
                } else{
                    return true;
                }
            })
        })
    } catch (err){
        return res.status(403).json({
            msg: 'Invalid token'
        })
    }
})

  

app.listen(3000, () => {
    console.log('server running!')
})
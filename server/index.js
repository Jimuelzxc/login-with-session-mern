const express = require('express')
const cors = require('cors')
const isEmpty = require('lodash.isempty'); // IF INPUT IS EMPTY
const bcrypt = require('bcrypt') // ENCRYPT PASSWORD
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const saltRounds = 10; // SALT FOR BCRYPT
const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors({
    origin: ['http://localhost:3000'],
    method: ["GET", "POST"],
    credentials: true
}));
app.use(cookieParser())
app.use(session({
    key: "userID",
    secret: "LOONATHEWORLD",
    resave: true,
    saveUninitialized: true,
    cookie: {
        expires: 10000 //COOKIE EXPRIRED 10 SECONDS
    }
}))

const PORT = 8000;
app.listen(PORT, (err) => {
    if (err) throw err;
    console.log('http://localhost:' + PORT)
})

const Signup = require('./services/Signup')
const Signin = require('./services/Signin')

app.post("/signup", (req, res) => {
    const { username, email, password } = req.body;

    if (isEmpty(username)) {
        res.send({ message: 'username cant be blank' })

    } else if (isEmpty(email)) {
        res.send({ message: 'email cant be blank' })

    } else if (isEmpty(password)) {
        res.send({ message: 'password cant be blank' })

    } else {
        bcrypt.hash(password, saltRounds, function (err, hashPassword) {
            if (err) throw err;
            const signup = Signup(username, email, hashPassword);
            signup.then(value => res.send({ status: true, message: "Success Signup" }))
        });
    }
})
app.post("/signin", (req, res) => {
    const { username, password } = req.body;
    const signin = Signin(username);
    signin.then(result => {
        if (result.length) {
            let user = result[0] // USERDATA
            bcrypt.compare(password, user.password, function (err, result) {
                if (err) throw err;
                if (result) {
                    req.session.user = user;
                    res.send({ status: result, message: "Successfully LoggedIn" })
                    console.log(req.session.user)
                    console.log(result)
                } else {
                    res.send({ message: "Wrong Password", status: result })
                }
            });
        } else {
            res.send({ message: "Please check your username and password and try again." })
        }
    })
})
app.get("/signin", (req, res) => {
    if(req.session.user){
        res.send({loggedIn: true, user: req.session.user})
    }else{
        res.send({loggedIn: false})
    }
})
app.get('/logout', (req,res) => {
    req.session.destroy(err => {
        if(err) throw err;
        res.send({status: true, message: "Logout success"})
    })
})
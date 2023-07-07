
const dotenv = require('dotenv')
dotenv.config({path: './config.env'})
//mongoose import 
const mongoose = require('mongoose')
//express js import
const express = require('express')
const app = express();
const cookieParser = require('cookie-parser')
let port = 5000

app.use(cookieParser())
app.use(express.json())
// router import
app.use(require('./router/auth'));


//database import
require('./db/conn')
//data model import
const User = require('./model/userSchema')

//listening app
app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});
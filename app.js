const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config()
// ===========================================
// Importing routes
const home = require('./routes/homeRoutes')
const admin = require('./routes/adminRoutes')
const student = require('./routes/studentRoutes')

// ===========================================

// Setting the urlencoded to acess the body
app.use(express.urlencoded({extended:true}))
// Setting the cookies to send the JWT token
app.use(cookieParser())
// Setting the method override
app.use(methodOverride('_method'))

// Dotenv variables
const PORT = process.env.PORT
const DB_KEY = process.env.MONGO_DB_KEY 

// Connecting with Data Base
mongoose.connect(DB_KEY)

const db = mongoose.connection

db.once('error', () => {console.log(`DataBase didn't load !`)})
db.once('open',() => {console.log(`DataBase loaded`)})

// EJS view
app.set('view engine','ejs')
app.set('views', path.join(__dirname,'templates'))

// Routes
app.use('/',home)
app.use('/admin',admin)
app.use('/student',student)

app.listen(PORT,() => {console.log(`Server running on PORT:${PORT}`)})
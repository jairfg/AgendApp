const express = require ('express')
const path = require('path')

//Initializations
const app = express()

//Settings
app.set('port',process.env.PORT || 5000)
app.set('views',path.join(__dirname,'views'))

//Middlewares
app.use(express.urlencoded({extended : false}))


//routes
app.get('/',(req,res) => {
    res.send('hello world')
})

// global variables


// static files
app.use(express.static(path.join(__dirname,'public')))



module.exports = app
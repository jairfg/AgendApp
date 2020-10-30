const express = require ('express')
const path = require('path')
const exphbs = require('express-handlebars')
const morgan = require('morgan')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')


//Initializations
const app = express()

//Settings
app.set('port',process.env.PORT || 3000)
app.set('views',path.join(__dirname,'views'))
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir : path.join(app.get('views') ,'layouts'),
    partialsDir: path.join(app.get('views') ,'partials'),
    extname: '.hbs',
    helpers: require('./helpers/index')}
));
app.set('view engine','.hbs')

//Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended : false}))
app.use(methodOverride('_method'))
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}))
app.use(flash())

// global variable
app.use((req,res,next)=> {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    next()
})

//routes
app.use(require('./routes/index.routes'))
app.use(require('./routes/notes.routes'))
app.use(require('./routes/clients.routes'))
app.use(require('./routes/users.routes'))



// static files
app.use(express.static(path.join(__dirname,'public')))



module.exports = app


// killers process node : killall -9 node
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





// global variables


//routes
app.use(require('./routes/index.routes'))
app.use(require('./routes/notes.routes'))
app.use(require('./routes/clients.routes'))



// static files
app.use(express.static(path.join(__dirname,'public')))



module.exports = app


// killers process node : killall -9 node
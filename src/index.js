const app = require('./server')
require('./databases')
require('dotenv').config()


app.listen(app.get('port'),()=> {
    console.log('server on port ')
})





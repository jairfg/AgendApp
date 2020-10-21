const app = require('./server')
const dotenv = require('dotenv')
dotenv.config()
require('./databases')



app.listen(app.get('port'),()=> {
    console.log('server on port ')
})





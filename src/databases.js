const mongoose = require('mongoose')
const MONGODB_URI = 'mongodb//localhost/AgendApp'

mongoose.connect('MONGODB_URI',{
    useUnifiedTopology:true,
    useNewUrlParser:true
})
    .then(db => console.log('database is connected'))
    .catch(err => console.log(err))



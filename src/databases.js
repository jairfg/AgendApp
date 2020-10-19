const mongoose = require('mongoose')

const {AGENDAPP_MONGODB_HOST,AGENDAPP_MONGODB_DATABASE} = process.env
const MONGODB_URI = `mongodb//${AGENDAPP_MONGODB_HOST}//${AGENDAPP_MONGODB_DATABASE} `

mongoose.connect('MONGODB_URI',{
    useUnifiedTopology:true,
    useNewUrlParser:true
})
    .then(db => console.log('database is connected'))
    .catch(err => console.log(err))



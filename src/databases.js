const mongoose = require('mongoose')
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${process.env.DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex : true,
    })
    .then((db) => console.log('MongoDB Connected...',db.connection.host))
    .catch((err) => console.log(err))


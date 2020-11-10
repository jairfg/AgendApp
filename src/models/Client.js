const {Schema , model} =  require('mongoose')

const ClientSchema  = new Schema({
    name : {type:String , required: true},
    phone : {
        type: String , required : true 
    },
    email : {
        type:String 
    },
    description : {
        type:String 
    },
    nro_identidad:{
        type:String
    }, user: {
        type: String,
        required : true
    }
},{
    timestamps : true
})

//nombre del modelo 
module.exports = model('Client',ClientSchema)


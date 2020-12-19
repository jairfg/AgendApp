const {Schema , model} =  require('mongoose')

const PatientSchema  = new Schema({
    name : {type:String , required: true},
    phone : {
        type: String , required : true 
    },
    email : {
        type:String , required : true
    },
    description : {
        type:String 
    },
    nroidentidad:{
        type:String , required : true
    }, user: {
        type: String,
        required : true
    },
    nombreArchivo: {
        type:String,
    }
},{
    timestamps : true
})

//nombre del modelo 
module.exports = model('Patient',PatientSchema)


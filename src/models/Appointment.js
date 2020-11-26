const {Schema , model} =  require('mongoose')

const AppointmentSchema  = new Schema({
    title : {
        type: String,
        required : true
    },
    comments : {
        type:String
    },
    date : {
      type: Date,
      required: true
    },
    client : {
        type:String ,
        required : true
    },
    user: {
        type: String,
        required : true
    }
},{
    timestamps : true
})

//nombre del modelo
module.exports = model('Appointment',AppointmentSchema)


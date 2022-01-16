const {Schema , model} =  require('mongoose')

const MeetingSchema  = new Schema({
    contact : {
        type:String ,
        required : true
    },
    timeMeeting : {
        type: String,
        required : true
    },
    dateMeeting : {
      type: Date,
      required: true
    },
    description : {
        type:String
    },
    user: {
        type: String,
        required : true
    }
},{
    timestamps : true
})

//nombre del modelo
module.exports = model('Meeting',MeetingSchema)


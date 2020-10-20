const {Schema , model } = require('mongoose')
const  bcrypt = require('bcryptjs')


const UserSchema = new Schema({
    name : {type:String , required: true},
    email : {
        type:String ,required : true 
    },
    password : {type : String , required : true}
},{
    timestamps : true
})
//metodo para cifrar
UserSchema.methods.encrypPassword = async password => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password,salt)
}
//compara contraseña
UserSchema.methods.matchPassword = async password => {
    return await bcrypt.compare(password ,UserSchema.password )
}

module.exports = model ('User',UserSchema)




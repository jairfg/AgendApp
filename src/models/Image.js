const {Schema,model } = require('mongoose')
const path = require('path')


const ImageSchema = new Schema({
    titulo: {
        type:String,
        required: true
    },
    nombreArchivo: {
        type:String,
        required: true
    }
} , {
    timestamps: true
})

ImageSchema.virtual('uniqueId')
    .get( function(){
        return this.nombreArchivo.replace(path.extname(this.nombreArchivo),'')
    } )

module.exports = model('Image',ImageSchema,)
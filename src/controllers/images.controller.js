const path = require('path')
const fs = require('fs-extra')
const {aleatorio} = require('../helpers/libs')
const Image = require('../models/Image')
const md5 = require('md5')
//creando un objeto  :
const imagesCtrl = {};


imagesCtrl.create =  (req,res) => {

    //funcion recursiva para guardar imagen
    const saveImage = async () => {
        const imgUrl = aleatorio()
        //verificando si hay varios objetos imagen con el mismo nombrealeatorio
        const imagenes = await Image.find({nombreArchivo : imgUrl})
        if(imagenes.length>0){
            saveImage()
        }else{
            const direccion = req.file.path
            const extension = path.extname(req.file.originalname).toLowerCase()
            const direccionFinal = path.resolve(`src/public/upload/${imgUrl}${extension}`)
            if(extension === '.jpg' || extension === '.png' || extension === '.jpeg' || extension === '.gif') {
                //moviendo imagen a la direccion final
                await fs.rename(direccion,direccionFinal)
                const newImg = new Image({
                    titulo : req.body.titulo,
                    nombreArchivo : imgUrl + extension
                })
                const imagenGuardada = await newImg.save()
                res.redirect('/images/'+imgUrl)
            }else{
                //eliminando archivo que no es imagen
                await fs.unlink(direccion)
                res.status(500).json({error : "solo estan permitidas imagenes"})
            }
        }
    }
    saveImage()
};






module.exports = imagesCtrl;


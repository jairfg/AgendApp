const path = require('path')
const fs = require('fs-extra')
const clientsController = {}
const Client = require('../models/Client')
const {aleatorio} = require('../helpers/libs')


clientsController.renderClientForm = async (req,res) => {
    res.render('clients/new-client')
}

clientsController.createClientForm = (req,res) => {
    const saveClient = async () => {
        const imgUrl = aleatorio()
        const imagenes = await Client.find({nombreArchivo : imgUrl})
        if(imagenes.length>0){
            saveClient()
        }else{
            const direccion = req.file.path;
            console.log(req.file.path)
            const extension = path.extname(req.file.originalname).toLowerCase()
            const direccionFinal = path.resolve(`src/public/upload/${imgUrl}${extension}`)
            if(extension === '.jpg' || extension === '.png' || extension === '.jpeg' || extension === '.gif') {
                //moviendo imagen a la direccion final
                await fs.rename(direccion,direccionFinal)
                const {name,email,phone,description,nroidentidad }  = req.body
                const nombreArchivo = imgUrl + extension;
                const newClient = new Client({name,email,phone,description,nroidentidad,nombreArchivo})
                newClient.user = req.user.id
                await newClient.save()
                req.flash('success_msg','Cliente agregado')
                res.redirect('/clients')
            }else{
                //eliminando archivo que no es imagen
                await fs.unlink(direccion)
                res.status(500).json({error : "solo estan permitidas imagenes"})
            }
        }
    }
    saveClient()



}
clientsController.renderClients = async (req,res) => {
    const clients = await Client.find({user : req.user.id}).sort({createdAt: 'desc'})
    res.render('clients/all-clients',{clients})
}

clientsController.renderEditForm = async (req,res) => {
    const {id} = req.params
    const client = await Client.findById(id)
    if(client.user !== req.user.id){
        return res.redirect('/clients')
    }
    console.log(client)
    res.render('clients/edit-client',{client})
}

clientsController.updateClient = async  (req,res) => {
    const saveClient = async () => {
        const imgUrl = aleatorio()
        const imagenes = await Client.find({nombreArchivo : imgUrl})
        if(imagenes.length>0){
            saveClient()
        }else{
            const direccion = req.file.path;
            console.log(req.file.path)
            const extension = path.extname(req.file.originalname).toLowerCase()
            const direccionFinal = path.resolve(`src/public/upload/${imgUrl}${extension}`)
            if(extension === '.jpg' || extension === '.png' || extension === '.jpeg' || extension === '.gif') {
                //moviendo imagen a la direccion final
                await fs.rename(direccion,direccionFinal)
                const {name,email,phone,description,nroidentidad }  = req.body
                const nombreArchivo = imgUrl + extension;
                await Client.findByIdAndUpdate(req.params.id, {name,phone,email,description,nroidentidad,nombreArchivo})
                req.flash('success_msg','Cliente actualizado correctamente')
                res.redirect('/clients')
            }else{
                //eliminando archivo que no es imagen
                await fs.unlink(direccion)
                res.status(500).json({error : "solo estan permitidas imagenes"})
            }
        }
    }
    saveClient()
}

clientsController.deleteClient = async (req,res) => {
    const {id} = req.params
    const client = await Client.findByIdAndDelete(id)
    res.redirect('/clients')
}


module.exports = clientsController
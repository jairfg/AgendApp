const path = require('path')
const fs = require('fs-extra')
const clientsController = {}
const Client = require('../models/Client')
const {aleatorio} = require('../helpers/libs')

const nombreAleatorio = async (req,res) => {
    const imgUrl = aleatorio()
    const imagenes = await Client.find({nombreArchivo : /^imgUrl/ })
    if (imagenes.length > 0){
        return  nombreAleatorio(req,res)
    }
    const direccion = req.file.path ;
    const extension = path.extname(req.file.originalname).toLowerCase()
    const direccionFinal = path.resolve(`src/public/upload/${imgUrl}${extension}`)
    if(extension === '.jpg' || extension === '.png' || extension === '.jpeg' || extension === '.gif') {
        await fs.rename(direccion,direccionFinal)
        const nombre = imgUrl + extension;
        return nombre
    }else{
        //eliminando archivo que no es imagen
        await fs.unlink(direccion)
        res.status(500).json({error : "solo estan permitidas imagenes"})
    }
}


clientsController.renderClientForm = async (req,res) => {
    res.render('clients/new-client')
}

clientsController.createClientForm = async (req,res) => {
    if(req.file === undefined){
        const {name,email,phone,description,nroidentidad }  = req.body
        const newClient = new Client({name,email,phone,description,nroidentidad,nombreArchivo : 'user.png'})
        newClient.user = req.user.id
        await newClient.save()
    }else{
        const nombreArchivo = await nombreAleatorio(req,res)
        const {name,email,phone,description,nroidentidad }  = req.body
        const newClient = new Client({name,email,phone,description,nroidentidad,nombreArchivo})
        newClient.user = req.user.id
        await newClient.save()
    }
    req.flash('success_msg','Cliente agregado')
    res.redirect('/clients')
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
    if(req.file === undefined){
        const {name,email,phone,description,nroidentidad }  = req.body
        await Client.findByIdAndUpdate(req.params.id, {name,phone,email,description,nroidentidad})
    }else{
        const nombreArchivo = await nombreAleatorio(req,res)
        const {name,email,phone,description,nroidentidad }  = req.body
        await Client.findByIdAndUpdate(req.params.id, {name,phone,email,description,nroidentidad,nombreArchivo})
    }
    req.flash('success_msg','Cliente actualizado correctamente')
    res.redirect('/clients')
}

clientsController.deleteClient = async (req,res) => {
    const {id} = req.params
    const client = await Client.findByIdAndDelete(id)
    res.redirect('/clients')
}


module.exports = clientsController
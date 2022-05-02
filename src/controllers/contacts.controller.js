const path = require('path')
const fs = require('fs-extra')
const contactsController = {}
const Contact = require('../models/Contact')
const {aleatorio} = require('../helpers/libs')
const { uploadFile } = require("../s3");


const nombreAleatorio = async (req,res) => {
    const imgUrl = aleatorio()
    const imagenes = await Contact.find({nombreArchivo : /^imgUrl/ })
    if (imagenes.length > 0){
        //si existe el nombre volvemos a ejecutar el algoritmo  
        return  nombreAleatorio(req,res)
    }
    const direccion = req.file.path ;
    //le quita la extension
    const extension = path.extname(req.file.originalname).toLowerCase()
    const direccionFinal = path.resolve(`src/public/upload/${imgUrl}${extension}`)
    req.file.path = direccionFinal;
    if(extension === '.jpg' || extension === '.png' || extension === '.jpeg' || extension === '.gif') {
        await fs.rename(direccion,direccionFinal)
        const nombre = imgUrl + extension;
        req.file.filename = nombre;
        return nombre
    }else{
        //eliminando archivo que no es imagen
        await fs.unlink(direccion)
        res.status(500).json({error : "solo estan permitidas imagenes"})
    }
}

contactsController.renderContactForm = async (req, res) => {
    res.render('contacts/new-contact')
}

contactsController.createContactForm = async (req, res) => {
    if(req.file === undefined){
        //guardar un usuario sin foto por defecto
        let {name,email,phone,description,nroidentidad }  = req.body
        name = name.trim()
        const newContact = new Contact({name,email,phone,description,nroidentidad,nombreArchivo : 'user.png'})
        newContact.user = req.user.id
        await newContact.save()
    }else{
        //si hay algo en el req.file
        const nombreArchivo = await nombreAleatorio(req,res);
        const result = await uploadFile(req.file);  // Calling above function in s3.js
        let {name,email,phone,description,nroidentidad }  = req.body
        name = name.trim()
        const newContact = new Contact({name,email,phone,description,nroidentidad,nombreArchivo})
        newContact.user = req.user.id
        await newContact.save()
    }
    req.flash('success_msg','Contacto agregado')
    res.redirect('/contacts')
}

contactsController.renderContacts = async (req, res) => {
    const contacts = await Contact.find({user : req.user.id}).sort({createdAt: 'desc'})
    res.render('contacts/all-contacts',{contacts})
}

contactsController.searchContact = async (req,res) => {
        let {contact} = req.query;
        contact = contact.trim()
        const result = await Contact.findOne({name : contact})
        if(contact === ''){
            req.flash('error_msg' , 'Campo vacío')
            res.redirect('/contacts')
        }
        else if(result === null) {
            req.flash('error_msg' , 'Contacto no encontrado')
            res.redirect('/contacts')
        }
        else {
            res.render('contacts/edit-contact',{contact: result})
        }
}

contactsController.renderEditForm = async (req, res) => {
    const {id} = req.params
    const contact = await Contact.findById(id)
    if(contact.user !== req.user.id){
        return res.redirect('/contacts')
    }
    console.log(contact)
    res.render('contacts/edit-contact',{contact})
}

contactsController.updateContact = async  (req, res) => {
    if(req.file === undefined){
        const {name,email,phone,description,nroidentidad }  = req.body
        await Contact.findByIdAndUpdate(req.params.id, {name,phone,email,description,nroidentidad})
    }else{
        const nombreArchivo = await nombreAleatorio(req,res)
        const result = await uploadFile(req.file);  // Calling above function in s3.js
        const {name,email,phone,description,nroidentidad }  = req.body
        await Contact.findByIdAndUpdate(req.params.id, {name,phone,email,description,nroidentidad,nombreArchivo})
    }
    req.flash('success_msg','Contacto actualizado correctamente')
    res.redirect('/contacts')
}

contactsController.deleteContact = async (req, res) => {
    const {id} = req.params
    const contact = await Contact.findByIdAndDelete(id)
    req.flash('success_msg','Contacto Eliminado')
    res.redirect('/contacts')
}


module.exports = contactsController
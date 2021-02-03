const path = require('path')
const fs = require('fs-extra')
const patientsController = {}
const Patient = require('../models/Patient')
const {aleatorio} = require('../helpers/libs')

const nombreAleatorio = async (req,res) => {
    const imgUrl = aleatorio()
    const imagenes = await Patient.find({nombreArchivo : /^imgUrl/ })
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


patientsController.renderPatientForm = async (req, res) => {
    res.render('patients/new-patient')
}

patientsController.createPatientForm = async (req, res) => {
    if(req.file === undefined){
        const {name,email,phone,description,nroidentidad }  = req.body
        const newPatient = new Patient({name,email,phone,description,nroidentidad,nombreArchivo : 'user.png'})
        newPatient.user = req.user.id
        await newPatient.save()
    }else{
        const nombreArchivo = await nombreAleatorio(req,res)
        const {name,email,phone,description,nroidentidad }  = req.body
        const newPatient = new Patient({name,email,phone,description,nroidentidad,nombreArchivo})
        newPatient.user = req.user.id
        await newPatient.save()
    }
    req.flash('success_msg','Paciente agregado')
    res.redirect('/patients')
}


patientsController.renderPatients = async (req, res) => {
    console.log(req.query)
    const patients = await Patient.find({user : req.user.id}).sort({createdAt: 'desc'})
    res.render('patients/all-patients',{patients})
}

patientsController.searchPatient = async (req,res) => {
    console.log("hola")

}


patientsController.renderEditForm = async (req, res) => {
    const {id} = req.params
    const patient = await Patient.findById(id)
    if(patient.user !== req.user.id){
        return res.redirect('/patients')
    }
    console.log(patient)
    res.render('patients/edit-patient',{patient})
}

patientsController.updatePatient = async  (req, res) => {
    if(req.file === undefined){
        const {name,email,phone,description,nroidentidad }  = req.body
        await Patient.findByIdAndUpdate(req.params.id, {name,phone,email,description,nroidentidad})
    }else{
        const nombreArchivo = await nombreAleatorio(req,res)
        const {name,email,phone,description,nroidentidad }  = req.body
        await Patient.findByIdAndUpdate(req.params.id, {name,phone,email,description,nroidentidad,nombreArchivo})
    }
    req.flash('success_msg','Patiente actualizado correctamente')
    res.redirect('/patients')
}

patientsController.deletePatient = async (req, res) => {
    const {id} = req.params
    const patient = await Patient.findByIdAndDelete(id)
    res.redirect('/patients')
}


module.exports = patientsController
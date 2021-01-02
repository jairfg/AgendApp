const appointmentsController = {}
const Appointment = require('../models/Appointment')
const Patient = require('../models/Patient')
const moment = require('moment')
moment.locale('es');


appointmentsController.createAppointmentForm =  async (req,res) => {
    const {patient , description , dateAppointment ,timeAppointment } = req.body;

    const time = `${timeAppointment}:00`
    const myMomentObject = moment(dateAppointment)
    const date = myMomentObject.add(moment.duration(time))
    const appointment = new Appointment({patient,description,dateAppointment : date ,timeAppointment });
    appointment.user = req.user.id;
    console.log(appointment)
    await appointment.save()
    res.redirect('/appointments')
}

appointmentsController.renderAppointments = async (req,res) => {
    const patients = await Patient.find({user : req.user.id}).sort({createdAt: 'desc'})
    const appointments = await Appointment.find({user : req.user.id}).sort({createdAt: 'desc'})
    res.render('appointments/all-appointments' , {appointments , patients})
}

appointmentsController.deleteAppointment = async (req,res) => {
    const {id} = req.params
    const appointment = await Appointment.findByIdAndDelete(id)
    req.flash('success_msg','Cita Eliminada')
    res.redirect('/appointments')
}

appointmentsController.renderEditForm = async (req,res) => {
    const {id} = req.params;
    const appointment = await Appointment.findById(id);
    const appointments = await Appointment.find({user : req.user.id}).sort({createdAt: 'desc'})
    const patients = await Patient.find({user : req.user.id}).sort({createdAt: 'desc'})
    if(appointment.user !== req.user.id){
        return res.redirect('/appointments')
    }
    res.render('appointments/edit-appointment', {appointment, appointments,patients})

}


appointmentsController.updateAppointment = async (req,res) => {
    console.log(req.body)
}





module.exports = appointmentsController


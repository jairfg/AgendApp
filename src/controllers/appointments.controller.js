const appointmentsController = {}
const Appointment = require('../models/Appointment')
const Patient = require('../models/Patient')

appointmentsController.createAppointmentForm =  async (req,res) => {
    const {patient , description , date ,time } = req.body;
    console.log(time)
    const appointment = new Appointment({patient,description,date,time});
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


module.exports = appointmentsController


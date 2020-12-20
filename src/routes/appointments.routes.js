const {Router} = require('express');
const router = Router()

const { createAppointmentForm , renderAppointments , deleteAppointment,updateAppointment} = require('../controllers/appointments.controller')
const {isAuthenticated} = require('../helpers/auth')

//new appointment
router.post('/appointment/add' , isAuthenticated , createAppointmentForm)

//render form and get all appointment
router.get('/appointments',isAuthenticated, renderAppointments)


//edit
router.delete('/appointments/edit/:id', isAuthenticated , updateAppointment)


//delete
router.delete('/appointments/delete/:id', isAuthenticated , deleteAppointment)
module.exports = router
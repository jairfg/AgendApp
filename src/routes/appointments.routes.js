const {Router} = require('express');
const router = Router()

const { createAppointmentForm , renderAppointments , deleteAppointment} = require('../controllers/appointments.controller')
const {isAuthenticated} = require('../helpers/auth')

//new appointment
router.post('/appointment/add' , isAuthenticated , createAppointmentForm)

//render form and get all appointment
router.get('/appointments',isAuthenticated, renderAppointments)


//delete
router.delete('/appointments/delete/:id', isAuthenticated , deleteAppointment)
module.exports = router
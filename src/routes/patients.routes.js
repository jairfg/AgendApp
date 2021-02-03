const {Router} = require('express')
const router = Router()
const {renderPatientForm,createPatientForm,renderPatients,renderEditForm,updatePatient,deletePatient,searchPatient} = require('../controllers/patients.controller')
const {isAuthenticated} = require('../helpers/auth')
//new Patient
router.get('/patient/add',isAuthenticated,renderPatientForm)
router.post('/patient/add',isAuthenticated , createPatientForm)

//get all Patient
router.get('/patients',isAuthenticated,  renderPatients)

//Edit Patient
router.get('/patient/edit/:id', isAuthenticated , renderEditForm)
router.put('/patient/edit/:id', isAuthenticated , updatePatient)

//delete 
router.delete('/patients/delete/:id', isAuthenticated , deletePatient)

//search patient
router.get('/patient', isAuthenticated, searchPatient)


module.exports = router
const {Router} = require('express')
const router = Router()
const {renderClientForm,createClientForm,renderClients,renderEditForm,updateClient,deleteClient} = require('../controllers/clients.controller')
const {isAuthenticated} = require('../helpers/auth')
//new client
router.post('/client/add',isAuthenticated , createClientForm)

//get all client
router.get('/clients',isAuthenticated,  renderClients)

//Edit client
router.get('/client/edit/:id', isAuthenticated , renderEditForm)
router.put('/client/edit/:id', isAuthenticated , updateClient)

//delete 
router.delete('/clients/delete/:id', isAuthenticated , deleteClient)

module.exports = router
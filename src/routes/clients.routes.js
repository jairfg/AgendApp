const {Router} = require('express')
const router = Router()
const {renderClientForm,createClientForm,renderClients,renderEditForm,updateClient,deleteClient} = require('../controllers/clients.controller')

//new client
router.post('/client/add',createClientForm)

//get all client
router.get('/clients', renderClients)

//Edit client
router.get('/client/edit/:id',renderEditForm)
router.put('/client/edit/:id',updateClient)

//delete 
router.delete('/clients/delete/:id',deleteClient)

module.exports = router
const {Router} = require('express')
const router = Router()
const {renderClientForm,createClientForm,renderClients,renderEditForm,updateClient,deleteClient} = require('../controllers/clients.controller')

//new client
router.get('/client/add',renderClientForm)
router.post('/client/add',createClientForm)

//get all client
router.get('/clients', renderClients)

//Edit client
router.get('/clients/edit/:id',renderEditForm)
router.put('/clients/edit/:id',updateClient)

//delete 
router.delete('/clients/delete/:id',deleteClient)

module.exports = router
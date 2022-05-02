const {Router} = require('express')
const router = Router()
const {renderContactForm,createContactForm,renderContacts,renderEditForm,updateContact,deleteContact,searchContact} = require('../controllers/contacts.controller')
const {isAuthenticated} = require('../helpers/auth')


//new Contact
router.get('/contact/add',isAuthenticated,renderContactForm);
router.post('/contact/add',isAuthenticated ,createContactForm);

//get all Contact
router.get('/contacts',isAuthenticated,  renderContacts)

//Edit Contact
router.get('/contact/edit/:id', isAuthenticated , renderEditForm)
router.put('/contact/edit/:id', isAuthenticated , updateContact)

//delete 
router.delete('/contacts/delete/:id', isAuthenticated , deleteContact)

//search contact
router.get('/search', isAuthenticated, searchContact)


module.exports = router
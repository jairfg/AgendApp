const {Router} = require('express')
const router = Router()
const {renderNoteForm,createNoteForm,renderNotes,renderEditForm,updateNote,deletenote} = require('../controllers/notes.controller')

//new note
router.get('/notes/add',renderNoteForm)
router.post('/notes/add',createNoteForm)

//get all note
router.get('/notes', renderNotes)

//Edit notes
router.get('/notes/edit/:id',renderEditForm)
router.put('/notes/edit/:id',updateNote)

//delete 
router.delete('/notes/delete/:id',deletenote)



module.exports = router
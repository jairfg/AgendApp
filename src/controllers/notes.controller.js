const notesController = {}
const Note = require('../models/Note')

notesController.renderNoteForm = (req,res) => {
    res.render('notes/new-note')
}
notesController.createNoteForm = async (req,res) => {
    const {title, description} = req.body
    const newNote = new Note({title,description})
    await newNote.save()
    res.send('new-note')
}

notesController.renderNotes = (req,res) => {
    res.send('render all notes')
}

notesController.renderEditForm = (req,res) => {
    res.send('render edit form')
}

notesController.updateNote = (req,res) => {
    res.send('update note')
}

notesController.deleteNote = (req,res) => {
    res.send('delete note')
}





module.exports = notesController
    const notesController = {}
const Note = require('../models/Note')


notesController.createNoteForm = async (req,res) => {
    const {title, description} = req.body
    const newNote = new Note({title,description})
    newNote.user = req.user.id
    await newNote.save()
    req.flash('success_msg','Nota agregada')
    res.redirect('/notes')
}
notesController.renderNotes = async (req,res) => {
    const noteMessage = []
    const notes = await Note.find({user : req.user.id}).sort({updatedAt: 'desc'})
    console.log(notes)
    if(notes.length === 0){
        noteMessage.push({text:'No tienes notas agregadas'})
        console.log(noteMessage)
         return res.render('notes/all-notes', { noteMessage })
    }
     return res.render('notes/all-notes',{notes})
}
notesController.renderEditForm = async (req,res) => {
    const {id} = req.params
    const note = await Note.findById(id)
    const notes = await Note.find({user : req.user.id}).sort({updatedAt: 'desc'})
    const notes_edit = notes.filter(el => el.id !== note.id)
    if(note.user !== req.user.id){
        return res.redirect('/notes')
    }
    res.render('notes/edit-note',{note, notes_edit})
}

notesController.updateNote = async (req,res) => {
    const {title, description} = req.body
    await Note.findByIdAndUpdate(req.params.id,{title,description})
    req.flash('success_msg','Nota actualizada')
    res.redirect('/notes')
}
notesController.deleteNote = async (req,res) => {
    const {id} = req.params
    const note = await Note.findByIdAndDelete(id)
    req.flash('success_msg','Nota Eliminada')
    res.redirect('/notes')
}


module.exports = notesController
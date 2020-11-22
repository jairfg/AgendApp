const notesController = {}
const Note = require('../models/Note')

notesController.renderNoteForm = (req,res) => {
    console.log(req.user)
    res.render('notes/new-note')
}
notesController.createNoteForm = async (req,res) => {
    const {title, description} = req.body
    const newNote = new Note({title,description})
    newNote.user = req.user.id
    await newNote.save()
    req.flash('success_msg','Nota agregada')
    res.redirect('/notes')
}
notesController.renderNotes = async (req,res) => {
    const notes = await Note.find({user : req.user.id}).sort({createdAt: 'desc'})
    res.render('notes/all-notes',{notes})
}
notesController.renderEditForm = async (req,res) => {
    const {id} = req.params
    const note = await Note.findById(id)
    if(note.user !== req.user.id){
        return res.redirect('/notes')
    }
    res.render('notes/edit-note',{note})
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
const notesController = {}

notesController.renderNoteForm = (req,res) => {
    res.render('notes/new-note')
}

notesController.createNoteForm = (req,res) => {
    console.log(req.body)
    res.send('new note')
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

notesController.deletenote = (req,res) => {
    res.send('delete note')
}





module.exports = notesController
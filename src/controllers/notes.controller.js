const notesController = {}

notesController.renderNoteForm = (req,res) => {
    res.send('note add')
}

notesController.createNoteForm = (req,res) => {
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
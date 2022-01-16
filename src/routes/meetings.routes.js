const {Router} = require('express');
const router = Router()

const { createMeetingForm , renderMeetings , deleteMeeting,updateMeeting,renderEditForm} = require('../controllers/meetings.controller')
const {isAuthenticated} = require('../helpers/auth')

//new meeting
router.post('/meeting/add' , isAuthenticated , createMeetingForm)

//render form and get all meeting
router.get('/meetings',isAuthenticated, renderMeetings)

//Edit meetings
router.get('/meetings/edit/:id',isAuthenticated ,renderEditForm)
router.put('/meetings/edit/:id',isAuthenticated, updateMeeting)

//delete
router.delete('/meetings/delete/:id', isAuthenticated , deleteMeeting)
module.exports = router
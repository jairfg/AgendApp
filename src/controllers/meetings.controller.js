const meetingsController = {}
const Meeting = require('../models/Meeting')
const Contact = require('../models/Contact')
const moment = require('moment')
moment.locale('es');


meetingsController.createMeetingForm =  async (req,res) => {
    const {contact , description , dateMeeting ,timeMeeting } = req.body;
    const time = `${timeMeeting}:00`
    const myMomentObject = moment(dateMeeting)
    const date = myMomentObject.add(moment.duration(time))
    const meeting = new Meeting({contact,description,dateMeeting : date ,timeMeeting });
    meeting.user = req.user.id;
    console.log(meeting)
    await meeting.save()
    req.flash('success_msg','Cita agregada')
    res.redirect('/meetings')
}

meetingsController.renderMeetings = async (req,res) => {
    const contacts = await Contact.find({user : req.user.id}).sort({createdAt: 'desc'})
    const meetings = await Meeting.find({user : req.user.id}).sort({createdAt: 'desc'})
    console.log(meetings)
    res.render('meetings/all-meetings' , {meetings , contacts})
}

meetingsController.deleteMeeting = async (req,res) => {
    const {id} = req.params
    const meeting = await Meeting.findByIdAndDelete(id)
    req.flash('success_msg','Meeting Eliminado')
    res.redirect('/meetings')
}

meetingsController.renderEditForm = async (req,res) => {
    const {id} = req.params;
    const meeting = await Meeting.findById(id);
    const meetings = await Meeting.find({user : req.user.id}).sort({createdAt: 'desc'})
    const contacts = await Contact.find({user : req.user.id}).sort({createdAt: 'desc'})
    if(meeting.user !== req.user.id){
        return res.redirect('/meetings')
    }
    res.render('meetings/edit-meeting', {meeting, meetings,contacts})
}

meetingsController.updateMeeting = async (req,res) => {
    const {contact , dateMeeting, timeMeeting ,description} = req.body;
    const time = `${timeMeeting}:00`
    const myMomentObject = moment(dateMeeting)
    const date = myMomentObject.add(moment.duration(time))
    await Meeting.findByIdAndUpdate(req.params.id,{contact,description,dateMeeting : date ,timeMeeting })
    req.flash('success_msg','Meeting actualizado')
    res.redirect('/meetings')
}





module.exports = meetingsController


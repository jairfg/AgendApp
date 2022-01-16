const moment = require('moment')
const helpers = {}
moment.locale('es');

helpers.timeTransform = createdAt => {
   const newtime = moment(createdAt).format('MMMM D YYYY, h:mm a')
   return newtime
}
helpers.updateNote = (updatedAt, createdAt)  => {
   const created =  moment(createdAt).format('MMMM D YYYY, h:mm a')
   const updated = moment(updatedAt).format('MMMM D YYYY, h:mm a')
   if(created !== updated){
      return `actualizado: ${updated}`
   }
}

// para la fecha de los meetings listados
helpers.showMeetingDate = dateMeeting => {
   return moment(dateMeeting).format('LL')
}

// para mostrar la fecha en el form edit meeting
helpers.MeetingEdit = dateMeeting => {
   const date = replaceEdit(moment(dateMeeting).format('L'))
   const list = date.split('-')
   const newlist = list.map( (el ,i,arr) => list[list.length - (i+1)] )
   return newlist.join('-')
}

const replaceEdit = date => {
   let newdate = date.replace('/','-');
   if(newdate.indexOf('/') !== -1){
      newdate = replaceEdit(newdate)
   }
   return newdate
}


module.exports = helpers
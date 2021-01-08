const moment = require('moment')
const helpers = {}
moment.locale('es');

// para las notas
helpers.timeTransform = createdAt => {
   return moment(createdAt).format('MMMM D YYYY, h:mm a')
}
helpers.updateNote = updatedAt => {
   return moment(updatedAt).startOf('hour').fromNow();
}

// para la fecha de las citas listadas
helpers.showAppointmentDate = dateAppointment => {
   return moment(dateAppointment).format('LL')
}

// para mostrar la fecha en el form edit cita
helpers.AppointmentEdit = dateAppointment => {
   const date = replaceEdit(moment(dateAppointment).format('L'))
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



// 1998-01-02 => fecha para mostrar en edit form
// 09/01/2021



module.exports = helpers
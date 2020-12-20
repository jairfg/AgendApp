const moment = require('moment')
const helpers = {}
moment.locale('es');

// formato =>
helpers.timeTransform = createdAt => {
   return moment(createdAt).format('MMMM D YYYY, h:mm a')
}
helpers.appointmentTime = dateAppointment => {
   return moment(dateAppointment).format('L')
}


module.exports = helpers
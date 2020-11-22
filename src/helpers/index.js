const moment = require('moment')
const helpers = {}
moment.locale('es');


helpers.time = createdAt => {
   return moment(createdAt).format('MMMM D YYYY, h:mm a')
}


module.exports = helpers
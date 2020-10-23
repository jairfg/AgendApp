const moment = require('moment')
const helpers = {}
moment.locale('es');


helpers.tiempo = createdAt => {
   return moment(createdAt).startOf('minute').fromNow()
}


module.exports = helpers
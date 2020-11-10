const {Router} = require('express')
const router = Router()
const {renderIndex} = require('../controllers/index.controller')
const {isNotAuthenticated} = require('../helpers/auth')

router.get('/', isNotAuthenticated, renderIndex)


module.exports = router
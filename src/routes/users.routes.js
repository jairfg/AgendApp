const {Router} = require('express')
const router = Router()

const {signup, logout , signin}  = require('../controllers/users.controller')


router.post('/users/signup', signup)
router.post('/users/signin',signin)
router.get('/users/logout',logout)





module.exports = router



const {Router} = require('express')
const router = Router();

const {create} = require('../controllers/images.controller')


//subir imagen
router.post('/images',create);


module.exports = router;

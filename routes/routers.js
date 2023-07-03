const router = require('express').Router()
const authentication = require('../routes/auth');

// ###***********************************************************authentication routes*************************************************************###
router.post('/app', authentication.auth);

router.get('/', authentication.data);

module.exports = router


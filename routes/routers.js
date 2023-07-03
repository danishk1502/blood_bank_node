const router = require('express').Router()
const authentication = require('../routes/auth');

// ###***********************************************************authentication routes*************************************************************###
router.get('/app', authentication.auth);






module.exports = router


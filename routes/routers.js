const router = require('express').Router()
const authentication = require('./auth');

// ###***********************************************************authentication routes*************************************************************###
router.post('/register', authentication.auth);
router.get('/', authentication.data);
router.get('/login', authentication.login);

module.exports = router;


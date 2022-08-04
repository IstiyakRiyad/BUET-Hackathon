const router = require('express').Router();

const login = require('./login');
const logout = require('./logout');
const refreshToken = require('./refreshToken');
const signup = require('./signup');
const resetEmailPassword = require('./resetEmailPassword');



router.use('/login', login);
router.use('/signup', signup);
router.use('/logout', logout);
router.use('/token', refreshToken);
router.use('/reset', resetEmailPassword);



module.exports = router;
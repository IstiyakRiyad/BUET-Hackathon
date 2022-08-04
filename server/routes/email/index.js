const router = require('express').Router();


const resetPasswordActivate = require('./resetPasswordActivate');


router.use('/reset', resetPasswordActivate);

module.exports = router;
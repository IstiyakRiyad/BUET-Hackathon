const router = require('express').Router();

const speechToken = require('./getSpeechToken');

router.use('/speechToken', speechToken);

module.exports = router;
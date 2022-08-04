const router = require('express').Router();
const checkAuth = require('../authorization/checkAuth')

const speechToken = require('./getSpeechToken');

/**
 * @swagger
 * tags:
 *     name: Speech To Text
 *     description: Get 
 */


router.use('/speechToken', checkAuth(), speechToken);

module.exports = router;
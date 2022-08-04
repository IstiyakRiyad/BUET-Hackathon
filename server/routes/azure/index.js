const router = require('express').Router();
const checkAuth = require('../authorization/checkAuth')

const speechToken = require('./getSpeechToken');

/**
 * @swagger
 * tags:
 *     name: Speech To Text
 *     description: Convert Speech to text
 */


router.use('/speechToken', checkAuth(), speechToken);

module.exports = router;
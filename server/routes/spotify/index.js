const router = require('express').Router();
const checkAuth = require('../authorization/checkAuth')

const speechToken = require('./searchMusic');

/**
 * @swagger
 * tags:
 *     name: Spotify Music
 *     description: Get Spotify Music
 */


router.use('/search', checkAuth(), speechToken);

module.exports = router;
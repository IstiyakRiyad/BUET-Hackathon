const router = require('express').Router();
const checkAuth = require('./authorization/checkAuth');

/**
 * @swagger
 * components:
 *  schemas:
 *      user:
 *          type: object
 *          required: 
 *          - name
 *          - email
 *          properties:
 *            _id:
 *              type: string
 *            name:
 *              type: string
 *              minimum: 2
 *              maximum: 500
 *            email: 
 *              type: string
 *              format: email
 * 
 */


/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      description: This is access token
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT 
 */


/**
 * @swagger
 * tags:
 *     name: Auth
 *     description: User info tag
 */




const emailAuth = require('./auth');
const email = require('./email');
const profile = require('./profile');
const azure = require('./azure');
const spotify = require('./spotify');
const news = require('./news');
const note = require('./note');
const generateKey = require('./APIKey');
const search = require('./Search');


router.use('/auth', emailAuth)
router.use('/email', email);
router.use('/profile', profile);
router.use('/azure', azure);
router.use('/spotify', spotify);
router.use('/news', news);
router.use('/key', generateKey);
router.use('/search', search);
router.use('/note', checkAuth(), note);


module.exports = router;
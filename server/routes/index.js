const router = require('express').Router();


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


router.use('/auth', emailAuth)
router.use('/email', email);
router.use('/profile', profile);


module.exports = router;
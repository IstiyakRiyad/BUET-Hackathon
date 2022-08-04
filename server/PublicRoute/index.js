const router = require('express').Router();

const createHttpError = require('http-errors');
const Token = require('../models/token');
const note = require('../routes/note');


/**
 * @swagger
 * tags:
 *     name: External API Endpoint
 *     description: Note apis
 */


/**
 * @swagger
 * components:
 *  securitySchemes:
 *    API_Key:
 *      type: apiKey
 *      name: apiKey
 *      in: query
 */



router.use(
    '/note', 
    async (req, res, next) => {
        try {
            const {apiKey} = req.query;

            if(!apiKey) throw createHttpError(401, 'ApiKey is required');
    
            const token = await Token.findOne({token: apiKey, tokenType: 'apiKey'});
    
            if(!token) throw createHttpError(401, 'Invalid API key');
    
            req.user = {
                userId: token.userId
            };
    
            return next();
        }
        catch(error) {
            next(error);
        }
    }, 
    note
);

module.exports = router;
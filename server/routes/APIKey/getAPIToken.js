const crypto = require('crypto');
const createHttpError = require('http-errors');
const router = require('express').Router();
const Note = require('../../models/note');
const Token = require('../../models/token');



/**
 * @swagger
 * /key/show:
 *  post:
 *      description: Get generated api key
 *      tags:
 *      - Key Generator
 * 
 *      security:
 *          - bearerAuth: []
 * 
 *                 
 *      responses:
 *          200:
 *              description: API key for other application
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message: 
 *                                  type: string
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      token:
 *                                          type: string
 *                      examples:
 *                          example:
 *                              value: {    message: 'Generated Token',    data: {        token: "1659645990333f076b3885699768a2bceb9441e2468"    }}
 *          401:
 *              description: Authorization code required
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message: 
 *                                  type: string
 *                      examples:
 *                          example:
 *                              value: {message: 'Authorization code required'}
 *          404:
 *              description: Key not found. Please create api key
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message: 
 *                                  type: string
 *                      examples:
 *                          example:
 *                              value: {message: 'Token not found. Please generate the key'}
 *          500:
 *              description: Internal Server Error
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message: 
 *                                  type: string
 *                      examples:
 *                          example:
 *                              value: {message: 'Server Error'}
 * 
 */



router.post('/', async (req, res, next) => {
    try {
        const {userId} = req.user;

        let token = await Token.findOne({userId, tokenType: 'apiKey'});
console.log(token)        
        if(!token) throw createHttpError(404, 'Token not found. Please generate the key');

        res.json({
            message: 'API Token',
            data: {
                token: token.token
            }
        });
    }
    catch(error) {
        next(error);
    }
});


module.exports = router;
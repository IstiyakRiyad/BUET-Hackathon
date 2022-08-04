const crypto = require('crypto');
const router = require('express').Router();
const Note = require('../../models/note');
const Token = require('../../models/token');



/**
 * @swagger
 * /key/generate:
 *  post:
 *      description: Create Note
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

        // Creating a token and send it to database
        let tokenValue;
        let token = await Token.findOne({userId, tokenType: 'apiKey'});
        if(!token) {
            token = await new Token({
                userId, 
                tokenType: 'apiKey'
            }).save();
        }
        else {
            tokenValue = `${Date.now() + crypto.randomBytes(15).toString('hex')}`;
            await Token.findOneAndUpdate({userId, tokenType: 'apiKey'}, {$set: {token: tokenValue}});
        }

        if(!tokenValue) tokenValue = token.token;

        res.json({
            message: 'Generated Token',
            data: {
                token: tokenValue
            }
        });
    }
    catch(error) {
        next(error);
    }
});


module.exports = router;
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const createError = require('http-errors');
const User = require('../../models/user');
const Token = require('../../models/token');



// Swagger docs

/**
 * @swagger
 * /email/reset/{token}:
 *  post:
 *      description: Enter password 
 *      tags:
 *      - Auth
 * 
 *      parameters:
 *      -   name: token
 *          in: path
 *          required: true
 *          description: token for password reset
 *          schema:
 *              type: string
 * 
 *      requestBody:
 *          description: User email
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          password:
 *                              type: string
 *                              minimum: 6
 *                              maximum: 127
 *                  examples:
 *                      example 1:
 *                          value: { password: '48df5ea21e2f'}
 *                      example 2: 
 *                          value: {password: '9bd3f98dbff0'}
 *                 
 *      responses:
 *          200:
 *              description: Account is created
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message: 
 *                                  type: string
 *                      examples:
 *                          example:
 *                              value: {message: 'Password reset successfull'}
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



router.post('/:token', async (req, res, next) => {
    try {
        const {token} = req.params;
        const {password} = req.body;

        // Check the token
        const dbToken = await Token.findOne({token, tokenType: 'resetEmail'});

        if(!dbToken) throw createError(401, "You don't have valid credentials");

        const hashPassword = await bcrypt.hash(password, 12);

        // set user verified
        await User.findOneAndUpdate({_id: dbToken.userId}, {$set: {password: hashPassword, refreshTokens: []}});

        await dbToken.delete();
        
        res.json({
            message: 'Password reset successfull'
        });
    }
    catch(error) {
        next(error);
    }
});



module.exports = router;
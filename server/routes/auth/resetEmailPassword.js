const router = require('express').Router();
const createError = require('http-errors');
const resetPassword = require('../../validators/resetEmailPassword');
const sendMail = require('../../utils/sendMail');
const User = require('../../models/user');
const Token = require('../../models/token');



// Swagger docs

/**
 * @swagger
 * /auth/reset:
 *  post:
 *      description: Reset password
 *      tags:
 *      - Auth
 * 
 *      requestBody:
 *          description: User email
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              format: email
 *                  examples:
 *                      example 1:
 *                          value: { email: 'istiyak.riyad@gmail.com'}
 *                      example 2: 
 *                          value: {email: 'TanvirMahin@gmail.com'}
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
 *                              value: {message: 'Email is sent to your account'}
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
        const {email} = await resetPassword.validateAsync(req.body);

        const user = await User.findOne({email});

        if(!user) throw createError(404, 'User not found');

        res.json({
            message: 'Email is sent to your account'
        });

        // Creating a token and send it to database
        let token = await Token.findOne({userId: user._id, tokenType: 'resetEmail'});
        if(!token) {
            token = await new Token({
                userId: user._id,
                tokenType: 'resetEmail'
            }).save();
        }

        // Activation mail
        const resetLink = `${process.env.CLIENT_URL}/reset/${token.token}?email=${encodeURI(user.email)}`;
        await sendMail({
            to: user.email,
            subject: 'Reset Password Mail',
            text: `Click on the given link ${resetLink}`,
            template: 'resetEmail',
            context: {
                name: user.name,
                email: user.email,
                link: resetLink
            }
        });
    }
    catch(error) {
        next(error);
    }
});



module.exports = router;
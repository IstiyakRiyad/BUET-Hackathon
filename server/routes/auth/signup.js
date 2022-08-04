const router = require('express').Router();
const createError = require('http-errors');
const bcrypt = require('bcryptjs');
const User = require('../../models/user');
const Token = require('../../models/token');
const signUp = require('../../validators/signup');
const {signRefreshToken} = require('../../utils/jwtUtils');



// Swagger docs

/**
 * @swagger
 * /auth/signup:
 *  post:
 *      description: Register a user
 *      tags:
 *      - Auth
 * 
 *      requestBody:
 *          description: User data
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              minimum: 2
 *                              maximum: 500
 *                          email:
 *                              type: string
 *                              format: email
 *                          password:
 *                              type: string
 *                              minimum: 6
 *                              maximum: 127
 *                  examples:
 *                      example 1:
 *                          value: {name: 'Istiyak', email: 'istiyak.riyad@gmail.com', password: '48df5ea21e2f'}
 *                      example 2: 
 *                          value: {name: 'Main', email: 'TanvirMahin@gmail.com', password: '9bd3f98dbff0'}
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
 *                              value: {message: 'Account created successfully'}
 *          401:
 *              description: User Already Exists
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message: 
 *                                  type: string
 *                      examples:
 *                          example:
 *                              value: {message: 'User Already Exists'}
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
        const {name, email, password} = await signUp.validateAsync(req.body);

        // Check if user already exists
        const user = await User.findOne({email});
        if(user) throw createError(401, 'User Already Exists');

        // Hash Password
        const hashPassword = await bcrypt.hash(password, 12);

        // Create Accounts
        const newUser = new User({
            name,
            email,
            password: hashPassword
        });

        const createdUser = await newUser.save();

        // Create Refresh Token
        const refreshToken = await signRefreshToken({userId: createdUser._id}, '180d');

        // Push cookie to sessions in user object
        await User.findOneAndUpdate({_id: createdUser._id}, {$push: {refreshTokens: refreshToken}});

        // Set cookie to response
        res.cookie('refreshToken', refreshToken, {
            maxAge: 15552000000,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' ? true : false,
            path: `api/v1/auth`,
            signed: true
        });

        res.json({
            message: 'Account created successfully'
        });
    }
    catch(error) {
        next(error);
    }
});



module.exports = router;
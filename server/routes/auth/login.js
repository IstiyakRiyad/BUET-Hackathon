const router = require('express').Router();
const createError = require('http-errors');
const bcrypt = require('bcryptjs');
const User = require('../../models/user');
const login = require('../../validators/login');
const {signRefreshToken} = require('../../utils/jwtUtils');


// Swagger docs

/**
 * @swagger
 * /auth/login:
 *  post:
 *      description: Login 
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
 *                          email:
 *                              type: string
 *                              format: email
 *                          password:
 *                              type: string
 *                              minimum: 6
 *                              maximum: 127
 *                  examples:
 *                      example 1:
 *                          value: {email: 'istiyak.riyad@gmail.com', password: '48df5ea21e2f'}
 *                      example 2: 
 *                          value: {email: 'TanvirMahin@gmail.com', password: '9bd3f98dbff0'}
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
 *                              value: {message: 'Login successfully'}
 *          401:
 *              description: Invalid Login
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message: 
 *                                  type: string
 *                      examples:
 *                          example:
 *                              value: {message: 'Invalid Login'}
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
        const {email, password} = await login.validateAsync(req.body);

        // Check if user already exists
        const user = await User.findOne({email});

        if(!user) throw createError(401, 'Invalid Login');
        

        // Check Password
        const check = await bcrypt.compare(password, user.password);

        if(!check) throw createError(401, 'Invalid Login');


        // Create Refresh Token
        const refreshToken = await signRefreshToken({userId: user._id}, '180d');

        // Push cookie to sessions in user object
        await User.findOneAndUpdate({_id: user._id}, {$push: {refreshTokens: refreshToken}});

        // Set cookie to response
        res.cookie('refreshToken', refreshToken, {
            maxAge: 15552000000,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' ? true : false,
            path: `api/v1/auth`,
            signed: true
        });

        
        res.json({
            message: 'Login successfully'
        });
    }
    catch(error) {
        next(error);
    }
});



module.exports = router;
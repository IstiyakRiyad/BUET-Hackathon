const router = require('express').Router();
const User = require('../../models/user');
const createHTTPError = require('http-errors')
const { 
    signRefreshToken, 
    verifyRefreshToken, 
    signAccessToken
} = require('../../utils/jwtUtils');
const {
    NODE_ENV
} = process.env;




/**
 * @swagger
 * /auth/token:
 *  post:
 *      description: Get Access Token
 *      tags:
 *      - Auth
 * 
 *                 
 *      responses:
 *          200:
 *              description: Access Token
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
 *                                      tokenType:
 *                                          type: string
 *                                      accessToken:
 *                                          type: jwt
 *                      examples:
 *                          example:
 *                              value: { "message": "Access token send successfully", "data": { "tokenType": "Bearer", "accessToken": "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmViNWE3NWU5YzY3NTdkNmExZDg2ODUiLCJpYXQiOjE2NTk1OTEzMjQsImV4cCI6MTY1OTY3NzcyNH0.AAAFLOIyhYV-RO4TTJCk7aus__RQqoEGoklyRBneAwEAAAT_WKSXYlVB7y_n1DScWvu2tOxEpel_7hU0qLBw2Q" }}
 *          401:
 *              description: Token expired or invalid
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message: 
 *                                  type: string
 *                      examples:
 *                          example:
 *                              value: {message: 'jwt must be provided'}
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
        const {refreshToken} = req.signedCookies;

        const payload = await verifyRefreshToken(refreshToken);

        const user = await User.findOne({_id: payload.userId});

        if(!user) throw createHTTPError(401, 'User not found');

        // Create Refresh Token and Access Token
        const newRefreshToken = await signRefreshToken({userId: user._id}, '180d');
        const newAccessToken = await signAccessToken({userId: user._id}, '1d');


        // Push cookie to sessions in user object
        const value = await User.findOneAndUpdate(
            {_id: user._id, refreshTokens: refreshToken}, 
            {$set: {'refreshTokens.$[element]': newRefreshToken}},
            {arrayFilters: [{element: {$eq: refreshToken}}]}
        );

        // Check if the refresh token is not found
        if(!value) {
            // Clear the cookie
            res.clearCookie('refreshToken', {
                path: `api/v1/auth`
            });
            throw createHTTPError(401, 'May be you remove your login sessions or your account is compromised');
        }


        // Set cookie to response
        res.cookie('refreshToken', newRefreshToken, {
            maxAge: 15552000000,
            httpOnly: true,
            secure: NODE_ENV === 'production' ? true : false,
            path: `api/v1/auth`,
            signed: true
        });

        

        res.json({
            message: 'Access token send successfully',
            data: {
                tokenType: 'Bearer',
                accessToken: newAccessToken
            }
        });
    }
    catch(error) {
        next(error);
    } 
});


module.exports = router;
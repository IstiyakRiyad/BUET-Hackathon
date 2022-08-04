const router = require('express').Router();
const User = require('../../models/user');
const {verifyRefreshToken} = require('../../utils/jwtUtils');



/**
 * @swagger
 * /auth/logout:
 *  post:
 *      description: Logout 
 *      tags:
 *      - Auth
 * 
 *                 
 *      responses:
 *          200:
 *              description: Logout successfull
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message: 
 *                                  type: string
 *                      examples:
 *                          example:
 *                              value: {message: 'Logout successfully'}
 *          401:
 *              description: Already logged out
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

        // Verify the refresh Token
        const payload = await verifyRefreshToken(refreshToken);

        // Clear the cookie
        res.clearCookie('refreshToken', {
            path: `api/v1/auth`
        });

        // Remove the refresh Token from sessions
        await User.findOneAndUpdate({_id: payload.userId}, {$pull: {refreshTokens: refreshToken}});

        res.json({
            message: 'Logout successfully'
        });

    }
    catch(error) {
        next(error);
    }
});



module.exports = router;
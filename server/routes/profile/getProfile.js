const router = require('express').Router();
const User = require('../../models/user');



// Swagger docs

/**
 * @swagger
 * /profile:
 *  get:
 *      description: Get Profile info
 *      tags:
 *      - Profile 
 * 
 * 
 *      security:
 *      -   bearerAuth: []      
 * 
 *                 
 *      responses:
 *          200:
 *              description: Account info
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              data:
 *                                  $ref: '#/components/schemas/user'   
 *                      examples:
 *                          example:
 *                              value: { "message": "Profile info", "user": { "_id": "62eb5a75e9c6757d6a1d8685", "name": "Md. Istiyak Hossain", "email": "istiyak.riyad@gmail.com"}}
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




router.get('/', async (req, res, next) => {
    try {
        const {userId} = req.user;
        
        const user = await User.findOne({_id: userId}, {_id: 1, email: 1, name: 1});

        res.json({
            message: 'Profile info',
            user,
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;
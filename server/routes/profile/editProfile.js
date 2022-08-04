const router = require('express').Router();
const User = require('../../models/user');



// Swagger docs

/**
 * @swagger
 * /profile:
 *  patch:
 *      description: Edit Profile info
 *      tags:
 *      - Profile 
 * 
 * 
 *      security:
 *      -   bearerAuth: []      
 *
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
 *                  examples:
 *                      example 1:
 *                          value: {name: 'Istiyak'}
 *                      example 2: 
 *                          value: {name: 'Main'}
 
 *                 
 *      responses:
 *          200:
 *              description: Account is upadted
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string 
 *                      examples:
 *                          example:
 *                              value: { "message": "Profile is updated successfully"}
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






router.patch('/', async (req, res, next) => {
    try {
        const {userId} = req.user;
        const {name} = req.body;

        const updateInfo = {};
        
        // Check if name and address is given
        if(name) updateInfo.name = name;
        
        const user = await User.findOneAndUpdate({_id: userId}, {$set: updateInfo});

        res.json({
            message: 'Profile is updated successfully'
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;
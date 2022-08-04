const router = require('express').Router();
const Note = require('../../models/note');




/**
 * @swagger
 * /note/:
 *  get:
 *      description: Get All Note
 *      tags:
 *      - Note
 * 
 *      security:
 *          - bearerAuth: []
 * 
 *                 
 *      responses:
 *          200:
 *              description: Note Data
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message: 
 *                                  type: string
 *                              data:
 *                                  type: object
 *                      examples:
 *                          example:
 *                              value: {"message": "Note Data",  "data": {    "notes": [      {        "_id": "62ec2a1b2c490b799fb4a34f",        "data": "Note 1",        "createdAt": "2022-08-04T20:20:43.733Z",        "updatedAt": "2022-08-04T20:20:43.733Z"      }    ]  }}
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

        const notes = await Note.find({userId}, {__v: 0, userId: 0});

        res.json({
            message: 'Note Data',
            data: {
                notes
            }
        });
    }
    catch(error) {
        next(error);
    }
});


module.exports = router;
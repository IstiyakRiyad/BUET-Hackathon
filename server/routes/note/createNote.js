const router = require('express').Router();
const Note = require('../../models/note');




/**
 * @swagger
 * /note/:
 *  post:
 *      description: Create Note
 *      tags:
 *      - Note
 * 
 *      requestBody:
 *          content:
 *              'application/json':
 *                  schema:
 *                      properties:
 *                          data: 
 *                              type: string
 *                  exmaple: {data: 'Note Data'}
 * 
 *      security:
 *          - bearerAuth: []
 * 
 *                 
 *      responses:
 *          200:
 *              description: Note is created
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
 *                              value: {"message": "Note Data","data": {    "notes": [      {        "_id": "62ec2a1b2c490b799fb4a34f",        "data": "Note 1",        "createdAt": "2022-08-04T20:20:43.733Z",        "updatedAt": "2022-08-04T20:20:43.733Z"      }    ]  }}
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





/**
 * @swagger
 * /external/note/:
 *  post:
 *      description: Create Note
 *      tags:
 *      - External API Endpoint
 * 
 *      security:
 *      -   API_Key: []
 * 
 *      requestBody:
 *          content:
 *              'application/json':
 *                  schema:
 *                      properties:
 *                          data: 
 *                              type: string
 *                  exmaple: {data: 'Note Data'}
 * 
 * 
 *                 
 *      responses:
 *          200:
 *              description: Note is created
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
 *                              value: {"message": "Note Data","data": {    "notes": [      {        "_id": "62ec2a1b2c490b799fb4a34f",        "data": "Note 1",        "createdAt": "2022-08-04T20:20:43.733Z",        "updatedAt": "2022-08-04T20:20:43.733Z"      }    ]  }}
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
        const {data} = req.body;
        const {userId} = req.user;

        await Note({
            userId,
            data
        }).save();

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
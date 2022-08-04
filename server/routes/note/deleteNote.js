const router = require('express').Router();
const createHttpError = require('http-errors');
const Note = require('../../models/note');




/**
 * @swagger
 * /note/{noteId}:
 *  delete:
 *      description: Create Note
 *      tags:
 *      - Note
 *      
 *      parameters:
 *      -   name: noteId
 *          in: path
 *          required: true
 *          description: Note Id
 *          schema:
 *              type: string
 * 
 * 
 *      security:
 *          - bearerAuth: []
 * 
 *                 
 *      responses:
 *          200:
 *              description: Note is deleted
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message: 
 *                                  type: string
 *                      examples:
 *                          example:
 *                              value: { message: 'Delete Note Data'}
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
 *          404:
 *              description: Note Not Found
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message: 
 *                                  type: string
 *                      examples:
 *                          example:
 *                              value: {message: 'Note not found'}
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



router.delete('/:noteId', async (req, res, next) => {
    try {
        const {noteId} = req.params;
        const {userId} = req.user;

        const note = await Note.findOneAndDelete({_id: noteId, userId});

        if(!note) throw createHttpError(404, 'Note not found');

        res.json({
            message: 'Note Data Deleted'
        });
    }
    catch(error) {
        next(error);
    }
});


module.exports = router;
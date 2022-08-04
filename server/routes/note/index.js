const router = require('express').Router();

const createNote = require('./createNote');
const getNote = require('./getNote');
const deleteNote = require('./deleteNote');

/**
 * @swagger
 * tags:
 *     name: Note
 *     description: Add Note
 */


router.use('/', createNote);
router.use('/', getNote);
router.use('/', deleteNote);

module.exports = router;
const router = require('express').Router();

const generateKey = require('./generateKey');
const getAPIToken = require('./getAPIToken');

const checkAuth = require('../authorization/checkAuth');

/**
 * @swagger
 * tags:
 *     name: Key Generator
 *     description: Generate key for external apis
 */



router.use('/show', checkAuth(), getAPIToken);
router.use('/generate', checkAuth(), generateKey);

module.exports = router;
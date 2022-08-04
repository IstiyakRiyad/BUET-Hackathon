const router = require('express').Router();
const checkAuth = require('../authorization/checkAuth')

const getNews = require('./getNews');

/**
 * @swagger
 * tags:
 *     name: News
 *     description: Get News
 */


router.use('/search', checkAuth(), getNews);

module.exports = router;
const router = require('express').Router();

const checkAuth = require('../authorization/checkAuth');

const getProfile = require('./getProfile')
const editProfile = require('./editProfile');

// Swagger docs

 /**
  * @swagger
  * tags:
  *   name: Profile
  *   description: User Profile Info
  */


router.use('/', checkAuth(), getProfile);
router.use('/', checkAuth(), editProfile);


module.exports = router;
const express = require('express');
const usersController = require('../controllers/users');

const router = express.Router();

router.post('/signIn', usersController.signIn);
router.post('/signUp', usersController.signUp);

module.exports = router;

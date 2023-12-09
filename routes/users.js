const express = require('express');
const usersController = require('../controllers/users');

const router = express.Router();

router.post('/login', usersController.login);
router.post('/register', usersController.register);
router.get('/validate', usersController.validateUser);
router.patch('/changepassword', usersController.changePassword);

module.exports = router;

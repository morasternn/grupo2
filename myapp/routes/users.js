var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

router.get('/register', userController.register);
router.post('/register', userController.registerprocess);
router.get('/login', userController.login);
router.post('/login', userController.loginprocess);
router.get('/profile', userController.profile);
module.exports = router;
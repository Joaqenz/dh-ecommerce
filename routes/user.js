var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')

/* GET users listing. */
router.get('/', userController.main);
router.get('/login', userController.login);
router.get('/register', userController.register);


module.exports = router;


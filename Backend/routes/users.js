var express = require('express');
const userController = require('../controllers/users');
var router = express.Router();

/* GET users listing. */
router.get('/', userController.getUsers);
router.get('/createtable', userController.createTable);
router.post('/adduser', userController.addUser);
router.post('/login', userController.login);

module.exports = router;

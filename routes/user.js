const express = require('express');
const router = express.Router();

//const model = require('../models/employes.model')();
var userController = require('../controllers/user.controller');

router.get('/', userController.show);

router.post('/add', userController.save);

router.get('/select/:id', userController.edit);

router.get('/delete/:id',userController.delete);

module.exports = router;

const express = require('express');
const router = express.Router();

//const model = require('../models/employes.model')();
var userController = require('../controllers/user.controller');

router.get('/', userController.show);

router.post('/add', userController.save);

router.put('/update', userController.edit);

router.get('/delete',userController.delete);

module.exports = router;

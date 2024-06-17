const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users', userController.getUsers);
router.put('/users', userController.updateUser);
router.delete('/users', userController.deleteUser);

module.exports = router;

const express = require('express');

const router = express.Router();

const { userController } = require('../controllers');
const { validateToken, validateUser } = require('../middlewares');

router.get('/', validateToken, userController.getUsers);
router.get('/:id', validateToken, userController.getUserById);

router.post('/', validateUser, userController.createUser);

router.delete('/me', validateToken, userController.deleteUser);

module.exports = router;
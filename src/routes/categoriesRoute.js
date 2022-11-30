const express = require('express');
const { validateToken, validateCategory } = require('../middlewares');

const router = express.Router();

const { categoryController } = require('../controllers');

router.post('/', validateToken, validateCategory, categoryController.createCategory);

module.exports = router;
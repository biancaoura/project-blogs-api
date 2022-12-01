const express = require('express');

const router = express.Router();

const { postController } = require('../controllers');
const { validateToken, validatePost } = require('../middlewares');

router.post('/', validateToken, validatePost, postController.createPost);

module.exports = router;
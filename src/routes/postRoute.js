const express = require('express');

const router = express.Router();

const { postController } = require('../controllers');
const { validateToken, validatePost } = require('../middlewares');

router.get('/', validateToken, postController.getPosts);

router.post('/', validateToken, validatePost, postController.createPost);

module.exports = router;
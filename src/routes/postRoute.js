const express = require('express');

const router = express.Router();

const { postController } = require('../controllers');
const { validateToken, validatePostCreation, validatePostUpdate } = require('../middlewares');

router.get('/', validateToken, postController.getPosts);
router.get('/:id', validateToken, postController.getPostById);

router.post('/', validateToken, validatePostCreation, postController.createPost);

router.put('/:id', validateToken, validatePostUpdate, postController.updatePost);

module.exports = router;
const express = require('express');
const postController = require('../controllers/postController');
const router = express.Router();

router.post('/', postController.createPost);
router.get('/:postid', postController.getPost);
router.put('/:postid', postController.updatePost);
router.delete('/:postid', postController.deletePost);

module.exports = router;

const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../middleware/auth');

// Create a new post (protected route)
router.post('/', auth, postController.createPost);

// Get authenticated user's posts (protected route)
router.get('/user', auth, postController.getUserPosts);

// Update a post (protected route)
router.put('/:id', auth, postController.updatePost);

// Delete a post (protected route)
router.delete('/:id', auth, postController.deletePost);

module.exports = router;

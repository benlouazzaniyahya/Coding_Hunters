const Post = require('../models/Post');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { title, description, difficulty, code, tags } = req.body;
    const post = await Post.create({
      title,
      description,
      difficulty,
      code,
      tags,
      author: req.user.id
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error: error.message });
  }
};

// Get user's posts
exports.getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user.id })
      .sort({ createdAt: -1 })
      .populate('author', 'username');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error: error.message });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      author: req.user.id
    });
    if (!post) {
      return res.status(404).json({ message: 'Post not found or unauthorized' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error: error.message });
  }
};

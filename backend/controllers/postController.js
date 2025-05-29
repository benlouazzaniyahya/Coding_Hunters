const Post = require('../models/Post');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const fs = require('fs');
    const path = require('path');
    const postsFilePath = path.join(__dirname, '..', 'data', 'posts.json');
    
    // Read existing posts
    const posts = JSON.parse(fs.readFileSync(postsFilePath, 'utf8') || '[]');
    
    // Create new post
    const newPost = {
      id: Date.now().toString(),
      title: req.body.title,
      description: req.body.description,
      difficulty: req.body.difficulty,
      code: req.body.code,
      tags: req.body.tags || [],
      author: req.user.id,
      createdAt: new Date().toISOString(),
      likes: [],
      comments: []
    };
    
    // Add new post to the array
    posts.push(newPost);
    
    // Save back to file
    fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));
    
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error in createPost:', error);
    res.status(500).json({ message: 'Error creating post', error: error.message });
  }
};

// Get user's posts
exports.getUserPosts = async (req, res) => {
  try {
    const fs = require('fs');
    const path = require('path');
    const postsFilePath = path.join(__dirname, '..', 'data', 'posts.json');
    
    // Read posts from file
    const posts = JSON.parse(fs.readFileSync(postsFilePath, 'utf8'));
    
    // Filter posts by author ID
    const userPosts = posts.filter(post => post.author === req.user.id);
    
    // Sort by createdAt in descending order (newest first)
    userPosts.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    
    res.json(userPosts);
  } catch (error) {
    console.error('Error in getUserPosts:', error);
    res.status(500).json({ message: 'Error fetching posts', error: error.message });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  try {
    const fs = require('fs');
    const path = require('path');
    const postsFilePath = path.join(__dirname, '..', 'data', 'posts.json');
    
    // Read existing posts
    const posts = JSON.parse(fs.readFileSync(postsFilePath, 'utf8'));
    
    // Find the post index
    const postIndex = posts.findIndex(
      post => post.id === req.params.id && post.author === req.user.id
    );
    
    if (postIndex === -1) {
      return res.status(404).json({ message: 'Post not found or unauthorized' });
    }
    
    // Update the post
    const updatedPost = {
      ...posts[postIndex],
      title: req.body.title,
      description: req.body.description,
      difficulty: req.body.difficulty,
      code: req.body.code,
      tags: req.body.tags || [],
      updatedAt: new Date().toISOString()
    };
    
    // Update the post in the array
    posts[postIndex] = updatedPost;
    
    // Save back to file
    fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));
    
    res.json(updatedPost);
  } catch (error) {
    console.error('Error in updatePost:', error);
    res.status(500).json({ message: 'Error updating post', error: error.message });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const fs = require('fs');
    const path = require('path');
    const postsFilePath = path.join(__dirname, '..', 'data', 'posts.json');
    
    // Read existing posts
    const posts = JSON.parse(fs.readFileSync(postsFilePath, 'utf8'));
    
    // Find the post index
    const postIndex = posts.findIndex(
      post => post.id === req.params.id && post.author === req.user.id
    );
    
    if (postIndex === -1) {
      return res.status(404).json({ message: 'Post not found or unauthorized' });
    }
    
    // Remove the post from the array
    posts.splice(postIndex, 1);
    
    // Save back to file
    fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));
    
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error in deletePost:', error);
    res.status(500).json({ message: 'Error deleting post', error: error.message });
  }
};

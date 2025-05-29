const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const auth = require('../middleware/auth');

const postsFilePath = path.join(__dirname, '..', 'data', 'posts.json');

const readPosts = () => {
  try {
    const data = fs.readFileSync(postsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading posts file:', error);
    return [];
  }
};

const writePosts = (posts) => {
  fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));
};

router.post('/', auth, (req, res) => {
  const posts = readPosts();
  const newPost = { ...req.body, id: Date.now().toString() };
  posts.push(newPost);
  writePosts(posts);
  res.send(newPost);
});

router.get('/', (req, res) => {
  const posts = readPosts();
  res.send(posts);
});

router.get('/user', auth, (req, res) => {
  const posts = readPosts();
  const userPosts = posts.filter(post => post.userId === req.user.id);
  res.send(userPosts);
});

router.delete('/:id', auth, (req, res) => {
  const posts = readPosts();
  const filteredPosts = posts.filter((post) => post.id !== req.params.id);
  writePosts(filteredPosts);
  res.send({ message: 'Post deleted successfully' });
});

module.exports = router;

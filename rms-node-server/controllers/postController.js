const Post = require('../models/postModel');

const postController = {
  createPost: (req, res) => {
    Post.create(req.body, (err, post) => {
      if (err) return res.status(400).json({ error: err.message });
      res.status(201).json(post);
    });
  },

  getPost: (req, res) => {
    Post.findById(req.params.postid, (err, post) => {
      if (err || !post) return res.status(404).json({ error: 'Post not found' });
      res.json(post);
    });
  },

  updatePost: (req, res) => {
    Post.update(req.params.postid, req.body, (err) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ message: 'Post updated successfully' });
    });
  },

  deletePost: (req, res) => {
    Post.delete(req.params.postid, (err) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ message: 'Post deleted successfully' });
    });
  },
};

module.exports = postController;

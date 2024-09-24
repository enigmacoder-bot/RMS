const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const userController = {
  registerUser: (req, res) => {
    User.create(req.body, (err, user) => {
      if (err) return res.status(400).json({ error: err.message });
      res.status(201).json(user);
    });
  },

  loginUser: (req, res) => {
    const { email, password } = req.body;

    User.findByEmail(email, (err, user) => {
      if (err || !user) return res.status(404).json({ error: 'User not found' });

      User.comparePassword(password, user.password, (err, isMatch) => {
        if (err || !isMatch) return res.status(401).json({ error: 'Incorrect password' });

        const token = jwt.sign({ userid: user.userid, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
      });
    });
  },

  getUser: (req, res) => {
    User.findById(req.user.userid, (err, user) => {
      if (err || !user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    });
  },

  updateUser: (req, res) => {
    User.update(req.user.userid, req.body, (err) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ message: 'User updated successfully' });
    });
  },

  deleteUser: (req, res) => {
    User.delete(req.user.userid, (err) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ message: 'User deleted successfully' });
    });
  },
};

module.exports = userController;

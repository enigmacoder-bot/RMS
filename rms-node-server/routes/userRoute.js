const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const passport = require('passport');
const router = express.Router();

// router.use(passport.initialize());
// router.use(passport.session());

// router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// router.get('/auth/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
//   res.json({ token: req.user.token, user: req.user.user });
// });

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/profile', auth.authenticateToken, userController.getUser);
router.put('/profile', auth.authenticateToken, userController.updateUser);
router.delete('/profile', auth.authenticateToken, userController.deleteUser);

module.exports = router;

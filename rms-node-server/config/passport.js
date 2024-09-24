const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { v4: uuidv4 } = require('uuid');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        
        User.findByEmail(email, async (err, existingUser) => {
          if (err) return done(err);

          if (existingUser) {
            const token = jwt.sign({ userid: existingUser.userid, email: existingUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return done(null, { user: existingUser, token });
          } else {
            const newUser = {
              userid: uuidv4(),
              username: `user_${uuidv4().slice(0, 8)}`,
              email,
              password: bcrypt.hashSync(uuidv4(), 10), // Storing a random password
              createdOn: new Date().toISOString(),
              profileIcon: profile.photos[0]?.value,
            };

            User.create(newUser, (err, createdUser) => {
              if (err) return done(err);

              const token = jwt.sign({ userid: createdUser.userid, email: createdUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
              return done(null, { user: createdUser, token });
            });
          }
        });
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;

const db = require('../config/database');
const bcrypt = require('bcryptjs');
const uuid = require('uuid')
const moment = require('moment')
const randomizeString  = require('../utilities/operations')

const User = {
  create: (user, callback) => {
    const userid = uuid.v4();
    const createdOn = moment().format('L')
    const { email, password,isGoogleLogin, isAdmin, profileIcon } = user;
    const username = randomizeString(email)
    const hashedPassword = bcrypt.hashSync(password, 10);

    db.run(
      `INSERT INTO user (userid, username, email, password, createdOn, isGoogleLogin, isAdmin, profileIcon) VALUES (?, ?, ?, ?, ?, ?,?,?)`,
      [userid, username, email, hashedPassword, createdOn,isGoogleLogin, isAdmin, profileIcon],
      function (err) {
        if (err) return callback(err);
        callback(null, { userid });
      }
    );
  },

  findByEmail: (email, callback) => {
    db.get(`SELECT * FROM user WHERE email = ?`, [email], (err, row) => {
      callback(err, row);
    });
  },

  comparePassword: (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
      if (err) return callback(err);
      callback(null, isMatch);
    });
  },

  findById: (userid, callback) => {
    db.get(`SELECT * FROM user WHERE userid = ?`, [userid], (err, row) => {
      callback(err, row);
    });
  },

  update: (userid, user, callback) => {
    const { username, email, password, profileIcon } = user;
    const hashedPassword = bcrypt.hashSync(password, 10);
    db.run(
      `UPDATE user SET username = ?, email = ?, password = ?, profileIcon = ? WHERE userid = ?`,
      [username, email, hashedPassword, profileIcon, userid],
      function (err) {
        if (err) return callback(err);
        callback(null);
      }
    );
  },

  delete: (userid, callback) => {
    db.run(`DELETE FROM user WHERE userid = ?`, [userid], function (err) {
      if (err) return callback(err);
      callback(null);
    });
  },
};

module.exports = User;

const db = require('../config/database');

const Review = {
  create: (review, callback) => {
    const { reviewid, userid, postid, liked, comment } = review;
    db.run(
      `INSERT INTO reviews (reviewid, userid, postid, liked, comment) VALUES (?, ?, ?, ?, ?)`,
      [reviewid, userid, postid, liked, comment],
      function (err) {
        if (err) return callback(err);
        callback(null, { reviewid });
      }
    );
  },

  findByPostId: (postid, callback) => {
    db.all(`SELECT * FROM reviews WHERE postid = ?`, [postid], (err, rows) => {
      callback(err, rows);
    });
  },

  delete: (reviewid, callback) => {
    db.run(`DELETE FROM reviews WHERE reviewid = ?`, [reviewid], function (err) {
      if (err) return callback(err);
      callback(null);
    });
  },
};

module.exports = Review;

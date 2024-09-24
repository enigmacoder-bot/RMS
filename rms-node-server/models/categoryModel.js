const db = require('../config/database');

const Category = {
  create: (category, callback) => {
    const { cid, label, sublabel } = category;
    db.run(
      `INSERT INTO category (cid, label, sublabel) VALUES (?, ?, ?)`,
      [cid, label, sublabel],
      function (err) {
        if (err) return callback(err);
        callback(null, { cid });
      }
    );
  },

  findAll: (callback) => {
    db.all(`SELECT * FROM category`, [], (err, rows) => {
      callback(err, rows);
    });
  },

  delete: (cid, callback) => {
    db.run(`DELETE FROM category WHERE cid = ?`, [cid], function (err) {
      if (err) return callback(err);
      callback(null);
    });
  },
};

module.exports = Category;

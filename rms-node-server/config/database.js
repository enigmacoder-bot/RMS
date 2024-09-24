const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./rms.db',sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS user (
      userid TEXT PRIMARY KEY,
      username TEXT,
      email TEXT NOT NULL UNIQUE,
      password TEXT,
      createdOn TEXT,
      isGoogleLogin BOOLEAN,
      isAdmin BOOLEAN,
      profileIcon TEXT
    );
  `);

  db.run(`
    CREATE TABLE  IF NOT EXISTS post (
      postid TEXT PRIMARY KEY,
      userid TEXT,
      category TEXT,
      postName TEXT NOT NULL,
      AdditionalName TEXT,
      description TEXT,
      subcategory TEXT,
      tags TEXT,
      date TEXT,
      ratings REAL,
      FOREIGN KEY (userid) REFERENCES user(userid) ON DELETE CASCADE
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS postImage (
      postimageid TEXT PRIMARY KEY AUTOINCREMENT,
      postid TEXT,
      image BLOB,
      createdOn TEXT,
      FOREIGN KEY (postid) REFERENCES post(postid) ON DELETE CASCADE
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS reviews (
      reviewid TEXT PRIMARY KEY,
      userid TEXT,
      postid TEXT,
      liked BOOLEAN,
      comment TEXT,
      FOREIGN KEY (userid) REFERENCES user(userid) ON DELETE CASCADE,
      FOREIGN KEY (postid) REFERENCES post(postid) ON DELETE CASCADE
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS category (
      cid INTEGER PRIMARY KEY,
      label TEXT,
      sublabel TEXT
    );
  `);
});

module.exports = db;

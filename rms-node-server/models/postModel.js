const db = require('../config/database');
const uuid = require('uuid')
const moment = require('moment')
const {convertFileToBase64} = require('../utilities/operations')

const Post = {
  create: async (post, callback) => {
    const {
      userid,
      category,
      postName,
      AdditionalName,
      description,
      subcategory,
      tags,
      images,
      ratings,
    } = post;

    const postid = uuid.v4(); // Generating unique postid using uuid
    const date = moment().format('L'); // Current date

    try {
      // Insert the post into the 'post' table
      db.run(
        `INSERT INTO post (postid, userid, category, postName, AdditionalName, description, subcategory, tags, date, ratings) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [postid, userid, category, postName, AdditionalName, description, subcategory, tags, date, ratings],
        async function (err) {
          if (err) return callback(err);

          // If images exist, insert them into the 'postImage' table
          if (images && images.length > 0) {
            const imageArray = images.split(',')
            for (const image of imageArray) {
              const postimageid = uuid.v4(); // Generating unique id for each image

              const imageBuffer = Buffer.from(image, 'base64'); // Convert to Buffer

              db.run(
                `INSERT INTO postImage (postimageid, postid, image, createdOn) VALUES (?, ?, ?, ?)`,
                [postimageid, postid, imageBuffer, date],
                function (err) {
                  if (err) return callback(err);
                }
              );
             }
          }
          callback(null, { postid });
        }
      );
    } catch (error) {
      callback(error); // Catch any unexpected errors
    }
  },

  findById: (postid, callback) => {
    // Query to get post details
    db.get(`SELECT * FROM post WHERE postid = ?`, [postid], (err, postRow) => {
      if (err) return callback(err);
  
      if (!postRow) return callback(null, null); // No post found
  
      // Query to get associated images
      db.all(`SELECT image FROM postImage WHERE postid = ?`, [postid], (err, imageRows) => {
        if (err) return callback(err);
  
        // Map imageRows to an array of image URLs
        const images = imageRows.map(row => row.image);
  
        // Combine post details and images
        const post = { ...postRow, images };
        callback(null, post);
      });
    });
  },
  

  update: (postid, post, callback) => {
    const {
      category,
      postName,
      AdditionalName,
      description,
      subcategory,
      tags,
      date,
      ratings,
    } = post;
    db.run(
      `UPDATE post SET category = ?, postName = ?, AdditionalName = ?, description = ?, subcategory = ?, tags = ?, date = ?, ratings = ? WHERE postid = ?`,
      [category, postName, AdditionalName, description, subcategory, tags, date, ratings, postid],
      function (err) {
        if (err) return callback(err);
        callback(null);
      }
    );
  },

  delete: (postid, callback) => {
    db.run(`DELETE FROM post WHERE postid = ?`, [postid], function (err) {
      if (err) return callback(err);
      callback(null);
    });
  },
};

module.exports = Post;

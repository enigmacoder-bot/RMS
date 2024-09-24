const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoute');
const postRoutes = require('./routes/postRoute');
const postImageRoutes = require('./routes/postImageRoute');
const reviewRoutes = require('./routes/reviewRoute');
const categoryRoutes = require('./routes/categoryRoute');
const cors = require('cors')
// const passport = require('./config/passport');
require('dotenv').config(); 

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Set the size limit to 10MB
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/postImages', postImageRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/categories', categoryRoutes);

const PORT = process.env.PORT || 9883;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

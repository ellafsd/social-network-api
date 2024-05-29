const express = require('express');
const mongoose = require('mongoose');
const friendRoutes = require('./routes/api/friends');
const thoughtRoutes = require('./routes/api/thoughts');
const userRoutes = require('./routes/api/users');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/friends', friendRoutes);
app.use('/api/thoughts', thoughtRoutes);
app.use('/api/users', userRoutes);

// MongoDB connection
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/social-network-api',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
});

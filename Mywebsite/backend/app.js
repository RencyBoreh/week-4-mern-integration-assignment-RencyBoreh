const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const skillRoutes = require('./routes/skillRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/comments', commentRoutes);

app.get('/', (req, res) => {
  res.send('🎯 API is running...');
});

module.exports = app;

const express = require('express');
const cors = require('cors');
const path = require('path');
const todoRoutes = require('./routes/todoRoutes');
const sequelize = require('./config/database');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the 'frontend' directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Routes
app.use('/api/todos', todoRoutes);

// Sync database and start server
sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });
}).catch(err => console.log(err));


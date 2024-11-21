const express = require('express');
const bodyParser = require('body-parser');
const bfhlRoutes = require('./routes/bfhlRoutes');
const cors = require('cors');

const app = express();
const corsOptions = {
    origin: 'http://localhost:3001',  // Allow requests from this domain
    methods: 'GET, POST, PUT, DELETE', // Allowed HTTP methods
    allowedHeaders: 'Content-Type, Authorization',  // Allow specific headers
  };

// Middlewar
app.use(bodyParser.json());

  
app.use(cors(corsOptions));
  
// Routes
app.use('/bfhl', bfhlRoutes);

module.exports = app;

// client/src/api/myApi.js

const express = require('express');
const router = express.Router();

// Define your API routes here
router.get('/data', (req, res) => {
  // Handle the GET request and send a response
  res.json({ message: 'This is a sample API route' });
});

module.exports = router;

// serverless.js
const { createServer } = require('@vercel/node');
const app = require('./myApi'); // Import your Express router

module.exports = createServer(app);
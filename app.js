require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./middleware/cors');

const chatRoutes = require('./routes/chat');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors);
app.use(bodyParser.json());

// Routes
app.use('/chat', chatRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('FussionAttire Chatbot Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
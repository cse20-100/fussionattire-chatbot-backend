const cors = require('cors');

const corsOptions = {
  origin: ['https://fussionattire.co.bw', 'http://localhost:3000'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

module.exports = cors(corsOptions);
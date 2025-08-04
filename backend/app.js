require('dotenv').config();
const express = require('express');
const cors = require('cors');
const githubRoutes = require('./github');
const aiRoutes = require('./ai');

const app = express();

const allowedOrigins = [
  'https://git-hub-test-generator.vercel.app',
  'http://localhost:5173',
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) {
      // Allow requests with no origin (like curl or Postman)
      callback(null, true);
      return;
    }
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200, // for legacy browsers
};

app.use(cors(corsOptions));


app.use(express.json());

app.use('/api/github', githubRoutes);
app.use('/api/ai', aiRoutes);

app.get('/', (req, res) => {
  res.send('Test Case Generator Backend');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

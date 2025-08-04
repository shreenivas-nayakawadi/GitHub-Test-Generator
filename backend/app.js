require('dotenv').config();
const express = require('express');
const cors = require('cors');
const githubRoutes = require('./github');
const aiRoutes = require('./ai');

const app = express();

const corsOptions = {
  origin: 'https://git-hub-test-generator.vercel.app',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
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

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const user = require('./routes/route');

const app = express();
app.use(express.json());

// Define CORS options
const corsOptions = {
  origin: process.env.FRONTEND_URL
};
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send("hello");
});

const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use('/student', user);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port :${PORT}`);
});

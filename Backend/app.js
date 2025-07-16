const express = require('express');
const mongoose = require('mongoose');
const urlRoutes = require('./routes/urlRoutes');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
app.use(cors());
connectDB();

app.use(express.json());
app.use('/shorten', urlRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
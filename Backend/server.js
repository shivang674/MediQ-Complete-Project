const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/subscribe', require('./routes/subscribeRoutes'));

app.listen(port, () => console.log(`Server started on port ${port}`));
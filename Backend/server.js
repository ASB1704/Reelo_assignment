const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
const questionRoutes = require('./routes/questionRoutes');
require('dotenv').config();
const connectToDatabase = async () => {
    try {
       await mongoose.connect(process.env.MONGO_URI);
 
       console.log('Connected to MongoDB');
    } catch (error) {
       console.error('Error connecting to MongoDB:', error.message);
       process.exit(1); 
    }
 };
 connectToDatabase();
 app.use(cors());
app.use(bodyParser.json());
app.use('/api', questionRoutes);
app.get('/', (req, res) => {
    res.send('Hello, this is your Express server!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//Need express and cors
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//Configuration from dotenv
require('dotenv').config();

//set up express server
const app = express();
const port = process.env.PORT || 5000;

//cors middleware to parse json
app.use(cors());
app.use(express.json());

//Connect to mongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB databse connection established successfully");
});

const exercisesRouter = require('./routes/exercises');
const userRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
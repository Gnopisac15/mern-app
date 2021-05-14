// calling all the downloaded dependencies

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//Create Routes
const StudentRouter = require('./routes/student')

require('dotenv').config();

// creating the app and environment using port 5000
const app = express();
const port=process.env.PORT||5000;

app.use(cors());
app.use(express.json());

// adapt connection string in the .env file
const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
});


//checking if the connection with mongodb is established
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("MongoDB connection established");
});

//student router
app.use('/student',StudentRouter);
// listening in the port 5000
app.listen(port,()=>{
    console.log("Server is running at port: " + port);
});

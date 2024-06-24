const express = require("express");

const { connectToMongoDB } = require("./connection");
const app = express();
const PORT = 8000;

// connection
connectToMongoDB("mongodb://localhost:27017/travel-website").then(() =>
    console.log("MongoDB Connected")
);



app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));
const express = require("express");

const { connectToMongoDB } = require("./connection");
const homeRoute = require("./routes/home");
const userRoute = require("./routes/user");

const app = express();
const PORT = 8000;

// connection
connectToMongoDB("mongodb://localhost:27017/travel-website").then(() =>
    console.log("MongoDB Connected")
);

// Set the view engine to ejs
app.set("view engine", "ejs");

// Specify the directory where your views are located 
app.set("views", path.resolve("./views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Router
/*
    -> "/"
    -> "/user"
*/
app.use("/", homeRoute);
app.use("/user", userRoute);

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));
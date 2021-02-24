const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose =  require("mongoose");

// connect to mongoose
mongoose
    .connect("mongodb://localhost:27017/exampleDB", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB.");
    })
    .catch((err) => {
        console.log("Connection Failed.");
        console.log(err);
    });


app.use(express.static("public"));


app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.listen(3000, () =>{
    console.log("Server is running on port 3000.");
});
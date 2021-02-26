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

//define a schema
const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    major: String,
    scholarship: {
        merit: Number,
        other: Number,
    },
});

// model for students
const Student = mongoose.model("Student", studentSchema);

// create an object
// const Jon = new Student({
//     name: "Jon Benson",
//     age: 25,
//     major: "EE",
//     scholarship: { merit:2500, other: 1300 },
// });

// save Jon to DB
// Jon.save()
//     .then(() => {
//         console.log("Jon has been saved into DB.");
//     })
//     .catch((e) => {
//         console.log("error has happened.");
//         console.log(e);
//     });




app.use(express.static("public"));


app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.listen(3000, () =>{
    console.log("Server is running on port 3000.");
});
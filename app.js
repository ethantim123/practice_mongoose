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
// 方式一
// const studentSchema = new mongoose.Schema({
//     name: String,
//     age: Number,
//     major: String,
//     scholarship: {
//         merit: Number,
//         other: Number,
//     },
// });

// 方式二
const studentSchema = new mongoose.Schema({
    name: {
        type : String,
        // required: true,
        required: [true, "You forgot to enter the name of this student."],
        maxlength: [15, "Name is too long."],
    },
    age: {
        type: Number,
        required: true,
        max: 100,
        default: 18,
    },
    major: {
        type: String,
        enum: [
            "Chem",
            "Electrical Engineering",
            "Computer Science",
            "Law",
            "undecided",
        ],
        default: "undecided",
    },
    scholarship: {
        merit: {
            type: Number,
            default: 0,
        },
        other: {
            type: Number,
            default: 0,
        }
    },
});

// model for students
const Student = mongoose.model("Student", studentSchema);

const newStudent = new Student({
    name: "Nelson Cruz",
    age: 18,
    major: "Political Science",
    scholarship: { merit: "1500", other: "2000"},
    isMarried: true, //不再schema內不會被存進資料庫
});
newStudent.save()
    .then(() => {
        console.log("Date has been saved");
    })
    .catch((e) => {
        console.log("error has happened");
        console.log(e);
    });

// insert---------------------------------------------------------------
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

// query---------------------------------------------------------------
//find()和findOne()差別在於find回傳用array裝,findOne回傳為單一物件
// find
// find objects in students
// Student.find({}).then((data) => {
//     console.log(data);
// });

// findOne
// Student.findOne({ name: "Jon Benson" }).then((data) => {
//     console.log(data);
// });


// update---------------------------------------------------------------
// Student.updateOne({ name: "Jon Benson" }, { name: "Carl Benson" }).then(
//     (msg) => {
//         console.log(msg);
//     }
// );

// Student.updateMany({ major: "EE" }, { major: "Electrical Engineering" }).then(
//     (msg) => {
//         console.log(msg);
//     }
// );

// Student.findOneAndUpdate(
//     { name: "Wilson Wu" },
//     { name: "Wilson Ren" },
//     { new: true }
// ).then( (msg) => {
//     console.log(msg);
// });

//find
// Student.find().then((data) => {
//     console.log(data);
// });

//find by condition
// Student.find({ "scholarship.merit": { $gte: 1500 }}).then((data) => {
//     console.log(data);
// });

// delete---------------------------------------------------------------
// Student.deleteOne({ "scholarship.merit": {$gte: 5000 }}).then((msg) => {
//     console.log(msg);
// });

// Student.findOneAndDelete({ "scholarship.merit": { $gte: 5500 }}).then(
//     (meg) => {
//         console.log(meg);
//     }
// );

app.use(express.static("public"));


app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.listen(3000, () =>{
    console.log("Server is running on port 3000.");
});
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
            min: [0, "Are you trying to enter negative numbers?"],
            max: 5000,
        },
        other: {
            type: Number,
            min: 0,
            default: 0,
        }
    },
});

// create an instance method
studentSchema.methods.totalScholarship = function () {
    return this.scholarship.merit + this.scholarship.other;
};


// create a model for students
const Student = mongoose.model("Student", studentSchema);


// use instance method
Student.findOne({ name: "Eric Aaron" }).then((data) => {
    let result = data.totalScholarship();
    console.log(result);
}).catch( e => {
    console.log("error!!!!");
    console.log(e);
})

//runValidators: true -->update時附加此條件才會再檢驗validator
// Student.findOneAndUpdate(
//     { name: "Eric Aaron"},
//     { "scholarship.merit": 50000 },
//     { new: true, runValidators: true }
// )
//     .then((meg) => {
//         console.log(meg);
//     })
//     .catch((e) => {
//         console.log("Update failed.");
//         console.log(e);
//     });


//不再schema內不會被存進資料庫
// const newStudent = new Student({
//     name: "Nelson Cruz",
//     age: 18,
//     major: "Political Science",
//     scholarship: { merit: "1500", other: "2000"},
//     isMarried: true, 
// });
// newStudent.save()
//     .then(() => {
//         console.log("Date has been saved");
//     })
//     .catch((e) => {
//         console.log("error has happened");
//         console.log(e);
//     });

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
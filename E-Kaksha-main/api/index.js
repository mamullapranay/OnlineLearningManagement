const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
//all these routes are required from routes folder present in the repo
const authRoute = require("./routes/auth");
const courseRoute = require("./routes/courses");
const assignmentRoute=require("./routes/assignments");
const quizRoute= require("./routes/quiz");
const classRoute = require("./routes/classes");
const chatRoute = require("./routes/chat");
const messageRoute = require("./routes/messages");
const materialRoute = require("./routes/material");
const relationStuCourseRoute= require("./routes/relationStuCourse");

const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

dotenv.config();
app.use(express.json());

//Connecting to database present at mongodb atlas-----------starts
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(console.log("Connected to mongo")).catch((err) => {console.log(err)});
//Connecting to database present at mongodb atlas-----------ends

app.use("/api/auth", authRoute);
app.use("/api/course", courseRoute);
app.use("/api/assignment",assignmentRoute);
app.use("/api/quiz",quizRoute);
app.use("/api/class", classRoute);
app.use("/api/chat", chatRoute);
app.use("/api/message", messageRoute);
app.use("/api/material", materialRoute);
app.use("/api/relationStuCourse", relationStuCourseRoute);

//starting application on port 1000
app.listen(1000, function(){
    console.log("Backend Running on port 1000");
});

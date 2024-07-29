const mongoose = require("mongoose");

// const que={
//     desc : String,
//     option: Array, //size of 4
//     correct_ans: String,
//     marks:Number
// }

// const subArray={
//     studentId: String,
//     markedAns: Array,
//     totalMarks: Number,
// }
const quizSchema = new mongoose.Schema({
    title : {
        type : String, 
    }, 
    date: {
        type: Date,
    },
    duration:{
        type: Number, //hours        
    },
    desc: {
        type: String
    },
    question:{
        type: Array, //of type que
    },
    submissions:{
        type: Array, //of type subArray
        default: []
    },
    courseId:{
        type: String,
        required: true
    }
    
},{timestamps: true});

module.exports = mongoose.model("Quiz", quizSchema);
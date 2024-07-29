const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
    beginTime:{
        type: Date,
    },
    endTime:{
        type: Date,
    },
    date:{
        type: Date,
    },
    presentStu:{
        type: Array, //array of student ids
        default:[]
    },
    courseId:{
        type: String,
        required: true
    }
    
},{timestamps: true});
module.exports = mongoose.model("Class", classSchema);
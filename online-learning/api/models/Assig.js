const mongoose = require("mongoose");
// const subArray={
//     student: String,
//     file: String
// }
const assigSchema = new mongoose.Schema({
    title : {
        type : String, 
        required : true
    }, 
    link: {
        type: String,
        required : true
    },
    issueDate: {
        type: Date,   
    },
    deadline: {
        type: Date,
        required : true
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

module.exports = mongoose.model("Assig", assigSchema);
const mongoose = require("mongoose");

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const relationStuCourseSchema = new mongoose.Schema({
    studentId : {
        type : ObjectId,
        required : true,
    },
    courseId : {
        type : ObjectId,
        required : true,
    },
    attended : {
        type : Number,
        default : 0
    },
    
},{timestamps: true});

relationStuCourseSchema.index({ studentId: 1, courseId: 1}, { unique: true });

module.exports = mongoose.model("relationStuCourse", relationStuCourseSchema);
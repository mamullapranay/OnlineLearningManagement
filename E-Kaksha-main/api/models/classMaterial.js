const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
    desc : {
        type : String,
        required : true,
    }, 
    file : {
        type : String,
        required : true
    },
    courseId : {
        type : String,
        required : true
    }
},{timestamps: true});

module.exports = mongoose.model("Material", materialSchema);
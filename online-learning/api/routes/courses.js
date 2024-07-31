const router = require("express").Router();
const req = require("express/lib/request");
const Course = require("../models/Course");
const RelationStuCourse = require("../models/RelationStuCourse")
const mongoose = require("mongoose");

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

    // join course from student side thus posting on db in RelationStuCourse Collection
router.post("/joinCourses/", async(req, res) => {
    
    try {
        
        if (!mongoose.Types.ObjectId.isValid(req.body.courseId)) {
            res.status(400).json("Course Code is Invalid");
        } else {
            const course = await Course.findById(req.body.courseId);
        if(!course){
            res.status(400).json("Course Code is Invalid");   
        }
        else{
            try{
                var id = mongoose.Types.ObjectId(req.body.studentId);
                var id2 = mongoose.Types.ObjectId(req.body.courseId);
                const RelationStuCourseTemp = new RelationStuCourse({
                    studentId : id,
                    courseId : id2
                })
                const newRelationStuCourse = await RelationStuCourseTemp.save(); 
                res.status(200).json(newRelationStuCourse);
                
            } catch(err){
                res.status(500).json(err);
            }
        }
        }
        
        
    } catch (err) {
        res.status(500).json(err);
    }  
    
    
}
)

//creating course and posting on db
router.post("/", async (req, res) => {
    const {name, desc, image, teacherId} = req.body;
    try {
        const course = new Course({
            name : name,
            desc : desc,
            image : image,
            teacherId : teacherId
        });
        
        const newCourse = await course.save();
        res.status(200).json(newCourse);

    }catch(err) {
        res.status(500).json({message : {msgBody : "Some error has occured", msgError : true}});
    }
});

//Get a course

router.get("/:id", async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        res.status(200).json(course);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get courseName 

router.get("/courseName/:cid", async(req,res)=>{
    try {
        const course = await Course.findById(req.params.cid,{name: 1});
        res.status(200).json(course);
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;


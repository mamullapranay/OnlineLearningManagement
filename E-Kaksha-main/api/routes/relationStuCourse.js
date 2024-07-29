const router = require("express").Router();
const RelStuCourse = require("../models/RelationStuCourse");

//get student with specific course id
router.get("/courseId/:cid" , async(req,res) =>{
    try{
        var query = {courseId : (req.params.cid)};
        const relStuCourse = await RelStuCourse.find(query);
        res.status(200).json(relStuCourse);
    } catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;
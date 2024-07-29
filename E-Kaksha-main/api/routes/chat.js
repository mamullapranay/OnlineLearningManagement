const router = require("express").Router();
const stuCourse = require("../models/RelationStuCourse");
const chat = require("../models/Chat");
const Course = require("../models/Course");


//create chat room

router.post("/", async(req, res) => {
    try {
        const newChat = new chat(req.body);
        const saveChat = await newChat.save();

        res.status(200).json(saveChat);
    } catch(err) {
        res.status(500).json(err);
    }
});

//get all students connected to a teacher
router.get("/students/:cid", async(req, res) => {
    try {

        var query = { courseId: (req.params.cid) };
        const students = await stuCourse.find(query);
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get all teachers connected to a student
router.get("/teacher/:cid", async (req, res) => {
    try {
        var course = await Course.findById(req.params.cid);
        res.status(200).json(course);
    } catch (err) {
        res.status(500).json(err);
    }
})

//get all recent chats of a user
router.get("/:id", async(req, res) => {
    try {
    const convo = await chat.find({
        members: {$in : [req.params.id]},
    });
    res.status(200).json(convo);
} catch (err) {
    res.status(500).json(err);
}
    
});



module.exports = router;
const router = require("express").Router();
const Quiz = require("../models/Quiz");


//get quiz with specific course id
router.get("/courseid/:cid",async(req,res)=>{
    try {
        var query = { courseId: (req.params.cid) };
        const quiz= await Quiz.find(query);
        res.status(200).json(quiz);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Post new quiz in db
router.post("/", async(req, res) => {
    try {
        const newQuiz = new Quiz(req.body);
        const response = await newQuiz.save();
        res.status(200).json(response);
    } catch(err) {
        res.status(500).json(err);
    }
})


//get quiz with specific id
router.get("/:id" , async(req,res) =>{
    try{
        const quiz = await Quiz.findById(req.params.id);
        res.status(200).json(quiz);
    }catch(err){
        res.status(500).json(err);
    }
})

//updating submission array present in quiz
router.put("/submission/:id", async (req, res) => {    
    try {
        
        const updated =   await Quiz.findByIdAndUpdate(
            req.params.id, 
            { $push: { submissions: req.body } },
            {new : true},
        );
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
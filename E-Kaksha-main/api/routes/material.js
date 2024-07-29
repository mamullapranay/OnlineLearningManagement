const router = require("express").Router();
const Material = require("../models/classMaterial");


//get courseMaterial with specific course id
router.get("/courseid/:cid",async(req,res)=>{

    try {
        var query = { courseId: (req.params.cid) };
        const material = await Material.find(query);
        res.status(200).json(material);
    } catch (err) {
        res.status(500).json(err);
    }
});

//create a courseMaterial
router.post("/", async (req, res) => {
    try {
        const newMaterial = new Material(req.body);
        const response = await newMaterial.save();

        res.status(200).json(response);
    } catch(err) {
        res.status(500).json(err);
    }
})

module.exports = router;
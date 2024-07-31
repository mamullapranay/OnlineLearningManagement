const router = require("express").Router();
const Message = require("../models/Message");

//get messages of specific chat room using chat id
router.get("/:convoId", async(req, res) => {
    try {
        const allMessages = await Message.find({chatId : req.params.convoId});

        res.status(200).json(allMessages);
    }catch(err) {
        res.status(500).json(err);
    }
});

//post messages in message collection in db
router.post("/", async(req, res) => {
    try {
        const newMessage = new Message(req.body);
        const message = await newMessage.save();

        res.status(200).json(message);

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
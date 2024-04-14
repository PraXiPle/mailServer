const express = require('express'),
    router = express.Router();

const chatService = require('../BL/chat.service')
const { auth } = require('../middlewares/auth')
router.put('/sendmessag', async (req, res) => {
    try {
        const { id, msg } = req.body
        console.log("#### --1-- ####")
        const result = await chatService.updateChat(id, msg)
        res.send(result)
    }
    catch (err) {
        res.status(400).send(err.msg || err.message || "wrong")
    }

})



module.exports = router;
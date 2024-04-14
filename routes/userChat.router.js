const express = require("express"),
  router = express.Router(),
  service = require("../BL/userChat.service");

router.post("/getchats", async (req, res) => {
  const userId = "6614021f31a18818eb678277";
  const { flags, poplate, input } = req.body;
  const userInbox = await service.getByFlags(userId, flags, poplate, input);
  res.send(userInbox);
});
router.post("/getchatsbyid", async (req, res) => {
  const { chatId } = req.body;
  const cheat = await service.getChatsById(chatId);
  res.send(cheat);
});
router.put("/readchat", async (req, res) => {
  const { chatId, userId } = req.body;
  const isUpdate = await service.updateChatStatus(userId, chatId);
  res.send(isUpdate);
});
router.put("/favoritchst", async (req, res) => {
  const { chatId, userId, statusaVlue } = req.body;
  const isUpdate = await service.updateChatStatus(
    userId,
    chatId,
    "isFavorite",
    statusaVlue
  );
  res.send(isUpdate);
});
module.exports = router;

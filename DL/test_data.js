const userController = require('./controller/user.controller');
const chatController = require('./controller/chat.controller.js');
const userChatController = require('./controller/userChat.controller');
const userChatService = require('../BL/userChat.service');
const userService = require('../BL/user.service');
const chatModel = require("../DL/models/chat.model.js");
const userModel = require('../DL/models/user.model.js');
const bcrypt = require("../middlewares/bcrypt.js")
require('dotenv').config()
require("./db.js").connect()

console.log(`\x1b[44m [db.js] test start \x1b[0m`)

// async function test() {
//    const u = await userChatController.readByCheatId(cheatId)
//    console.log(u);
// }
async function test2() {
    const userId = "6616d4ebfeb2a84fe1ce6271"
    const chatId = "6616d4effeb2a84fe1ce62bf"
    const user = await userService.login({ email: "avi@gmail.com", password: "Avi6453415" })
    console.log(user);
}
async function test3() {
}

test2()
const userChatController = require('../DL/controller/userChat.controller')
const userService = require('./user.service')
// const { Flags } = require('../utility')

const getByFlags = async (userId, flags, poplate = { chats: true, users: true }, input = "") => {
    let { chats } = await userChatController.readByFlags(userId, flags, poplate);
    if (input) {
        return chats.filter(chat =>
            chat?.chat?.members?.some(member =>
                member?.fullName?.toLowerCase().includes(input.toLowerCase())
            )
        );
    }

    return chats
}
const getChatsById = async (id) => {
    const chats = await userChatController.readByCheatId(id);
    if (chats) {
        return chats;
    }
    return {}
}
const updateChatsStatus = async (userId, chatId, data) => {
    const user = await userService.getUser({ _id: userId, emails: { $elemMatch: { chat: chatId } } }, true)
    if (user) {
        user.chats[0] = { ...user.chats[0], ...data }
        return await user.save()
    }
    return null
}
const updateChatStatus = async (userId, chatId, status = "isRead", statusaVlue = true) => {
    const result = await userChatController.updateChatStatus(userId, chatId, status, statusaVlue)
    return result;
}
module.exports = { updateChatsStatus, getByFlags, getChatsById, updateChatStatus }
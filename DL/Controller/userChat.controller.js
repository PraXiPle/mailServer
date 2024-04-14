const userModel = require('../models/user.model');
const chatModel = require("../models/chat.model")
async function readByFlags(id, flags = [], populate = {}, search) {
    let data = await userModel.findOne({ _id: id, isActive: true })
    if (!data) return []
    data.chats = data.chats.filter(c => flags.every(f => {
        if (typeof f === 'object') {
            let [[k, v]] = Object.entries(f)
            return c[k] == v
        }
        return c[f]
    }))
    if (populate.chats) data = await data.populate('chats.chat')
    if (populate.users) data = await data.populate({ path: 'chats.chat.members', select: "fullName avatar" })
    return data.toObject()
}
async function readByCheatId(id) {
    const data = await chatModel.findOne({ _id: id }).populate({ path: "msg.from", select: "fullName avatar" });
    return data;
}
async function updateChatStatus(userId, chatId, status, statusValue) {
    try {
        const updatedUser = await userModel.findOneAndUpdate(
            { _id: userId, "chats._id": chatId },
            { $set: { [`chats.$.${status}`]: statusValue } }, 
            { new: true }
        );
        if (!updatedUser) {
            throw new Error('User or chat not found');
        } 
        return true;
    } catch (error) {
        console.error(`Error updating chat read status: ${error.message}`);
        return false; // Added a return statement for the catch block
    }
}
module.exports = { readByFlags, readByCheatId, updateChatStatus }
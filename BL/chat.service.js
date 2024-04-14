const chatController = require('../DL/Controller/chat.controller')

const creatChat = async () => {

}
const getChat = async (filter, isPopulate) => {
    return chatController.read(filter, isPopulate);
}
const getManyChats = async (filter) => {
    return chatController.read(filter);

}
const updateChat = async (id, data) => {
    const result = await chatController.update(id, data)
    return result

}


module.exports = { creatChat, getChat, getManyChats, updateChat }




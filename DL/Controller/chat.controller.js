const chatModel = require('../models/chat.model')

// CRUD
const create = async (data) => {
  return await chatModel.create(data)
}
const read = async (filter, isPopulate) => {
  return await chatModel.find(filter).populate(isPopulate && { path: "msg.from", select: "fullName avatar" })
}
const readOne = async (filter) => {
  return await chatModel.findOne(filter)
}
const update = async (id, newMsg) => {
  try {
    const updatedDocument = await chatModel.findOneAndUpdate(
      { _id: id },
      { $push: { msg: newMsg } },
      { new: true }
    );
    const lastIndex = updatedDocument.msg.length - 1;
    const [{ msg }] = await read({ _id: id }, true);
    return msg[lastIndex];
  } catch (error) {
    console.error(`error : ${error.message}`);
    throw new Error(`error : ${error.message}`);
  }
};
const del = async (id) => {
  return await update(id, { isActive: false })
}

module.exports = { create, read, readOne, update, del }
const userModel = require("../models/user.model");

// CRUD
async function create(data) {
  return await userModel.create(data);
}
async function read(filter) {
  return await userModel.find({ ...filter, isActive: true });
}

async function passCheckerLogin(email, passwrod) {
  const user = userModel.findOne({ email });
  if (!user) throw "no user Exsist ";
  if (user.password !== passwrod) {
    throw "error password dont match ";
  } else {
    return user.select("-password");
  }
}
async function readOne(filter, populate = {}, selectPassword = false) {
  try {
    let query = userModel.findOne({ ...filter, isActive: true });

    if (selectPassword) {
      query = query.select("+password");
    }

    let data = await query.exec();

    if (populate.chats) {
      await data.populate("chats.chat").execPopulate();
    }
    if (populate.users) {
      await data.populate("chats.chat.to").execPopulate();
    }

    return data;
  } catch (error) {
    console.error("Error during readOne:", error);
    throw error; // Rethrow the error for higher-level handling
  }
}

async function update(id, data) {
  // return await userModel.findOneAndUpdate({_id:id}, data,{new : true})
  return await userModel.findByIdAndUpdate(id, data, { new: true });
}
async function del(id) {
  return await update(id, { isActive: false });
}

module.exports = { create, read, readOne, update, del, passCheckerLogin };

// const userModel = require("../Models/user.model");

// const create = async(data)=>{
//     return await userModel.create(data);
// }
// const read = async(filter , isPopulate)=>{
//     return await userModel.find({...filter, isActive:true}).populate(isPopulate ? "emails" : "");
// }
// const readOn = async(filter , isPopulate)=>{
//     return await userModel.findOne({...filter, isActive:true}).populate(isPopulate ? "emails" : "");
// }
// const update = async(id , data)=>{
//     return await userModel.findByIdAndUpdate(id, {...+data} , {new:true});

// }
// const del = async(id)=>{
//     return await update(id , {isActive:false})
// }

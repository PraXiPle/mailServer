const controller = require("../DL/controller/user.controller");
const { hashPassword, comparePassword } = require("../middlewares/bcrypt");
const createUser = async (data = {}) => {
  data.password = await hashPassword(data.password);
  return await controller.create(data);
};

const getUser = async (filter, isPopulate) => {
  return await controller.readOne(filter, isPopulate);
};
const login = async (filter = {}) => {
  const loginPassword = filter.password;
  try {
    const user = await controller.readOne({ email: filter.email }, {}, true);
    if (!user) {
      return false;
    }
    const isPasswordOk = await comparePassword(loginPassword, user.password);

    if (isPasswordOk) {
      delete user.password;
      return user;
      //   return { id: user._id };
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error during login:", error);
    return false;
  }
};
const getManyUsers = async (filter, isPopulate) => {
  return await controller.read(filter, isPopulate);
};

const updateUserInfo = async (id, data) => {
  delete data._id;
  return await controller.update(id, data);
};

const deleteUser = async (userId) => {
  return await controller.del(userId);
};

module.exports = {
  createUser,
  getUser,
  login,
  getManyUsers,
  updateUserInfo,
  deleteUser,
};

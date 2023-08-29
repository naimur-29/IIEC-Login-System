const User = require("../schema/user");

const getUsersById = async (id) => {
  try {
    const user = await User.findOne({ id: id });
    return user;
  } catch (error) {
    console.log(error);
    return {
      status: 404,
      message: "User not found!",
    };
  }
};

const getUsers = async () => {
  try {
    const res = await User.find();
    return res;
  } catch (error) {
    console.log(error);
    return {
      status: 404,
      message: "Users not found!",
    };
  }
};

const getActiveUsers = async () => {
  try {
    const res = await User.find({ active: true });
    let filteredRes = [];
    for (let ele of res) {
      filteredRes.push({ name: ele.name, id: ele.id });
    }

    return filteredRes;
  } catch (error) {
    console.log(error);
    return {
      status: 404,
      message: "Active Users not found!",
    };
  }
};

const createUser = async ({ userData }) => {
  try {
    // check if user already exists:
    const existingUser = await getUsersById(userData.id);

    if (existingUser) {
      return {
        status: 400,
        message: "User already exists!",
      };
    }

    // try creating user:
    await User.create(userData);

    return {
      status: 200,
      message: "User created successfully!",
    };
  } catch (error) {
    console.log(error);

    return {
      status: error.code,
      message: "Internal server error!",
    };
  }
};

const updateUserById = async ({ id, updatedData }) => {
  try {
    await User.updateOne({ id: id }, { $set: updatedData });

    return {
      status: 200,
      message: "User updated successfully!",
    };
  } catch (error) {
    return {
      status: 500,
      message: "Internal server error!",
    };
  }
};

module.exports = {
  getUsersById,
  getUsers,
  getActiveUsers,
  createUser,
  updateUserById,
};

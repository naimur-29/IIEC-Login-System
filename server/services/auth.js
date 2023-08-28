const crypto = require("crypto");
const { createUser, getUsersById, updateUserById } = require("./users");

const getHashedPassword = (plainPassword) => {
  const secretKey = "woureksdljfl302948sldkf90";

  const hmac = crypto.createHmac("sha256", secretKey);
  hmac.update(plainPassword);

  const hashedPassword = hmac.digest("hex");

  return hashedPassword;
};

// new user register:
const registerUser = async ({ userData }) => {
  const hashedPassword = getHashedPassword(userData.password);

  // create user with hashed password:
  const res = await createUser({
    userData: { ...userData, password: hashedPassword },
  });

  return res;
};

// user sign In:
const signUserIn = async ({ userData }) => {
  // check if user id valid or not:
  const user = await getUsersById(userData.id);

  if (!user || user?.status === 404) {
    return {
      status: 404,
      message: "User not found!",
    };
  }

  // check if user password valid or not:
  const hashedPassword = getHashedPassword(userData.password);
  if (user.password !== hashedPassword) {
    return {
      status: 404,
      message: "Wrong password!",
    };
  }

  // check if user already signed in or not:
  if (user.active) {
    return {
      status: 200,
      message: "User already signed in!",
    };
  }

  // sign user in:
  const res = await updateUserById({
    id: userData.id,
    updatedData: { active: true },
  });

  if (res.status !== 200) return res;
  else return { ...res, message: "User signed in successfully!" };
};

// user sign Out:
const signUserOut = async ({ userData }) => {
  // see if user id is valid or not:
  const user = await getUsersById(userData.id);

  if (!user || user?.status === 404) {
    return {
      status: 404,
      message: "User not found!",
    };
  }

  // check if user password valid or not:
  const hashedPassword = getHashedPassword(userData.password);
  if (user.password !== hashedPassword) {
    return {
      status: 404,
      message: "Wrong password!",
    };
  }

  // check if user already signed out or not:
  if (!user.active) {
    return {
      status: 200,
      message: "User already signed out!",
    };
  }

  // sign user out:
  const res = await updateUserById({
    id: userData.id,
    updatedData: { active: false },
  });

  if (res.status !== 200) return res;
  else return { ...res, message: "User signed out successfully!" };
};

module.exports = { registerUser, signUserIn, signUserOut };

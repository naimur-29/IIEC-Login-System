const crypto = require("crypto");
const { createUser, getUsersById, updateUserById } = require("./users");

const getHashedPassword = (plainPassword) => {
  const secretKey = "woureksdljfl302948sldkf90";

  const hmac = crypto.createHmac("sha256", secretKey);
  hmac.update(plainPassword);

  const hashedPassword = hmac.digest("hex");

  return hashedPassword;
};

const registerUser = async ({ userData }) => {
  const hashedPassword = getHashedPassword(userData.password);

  // create user with hashed password:
  const res = await createUser({
    userData: { ...userData, password: hashedPassword },
  });

  return res;
};

const signUserIn = async ({ userData }) => {
  const user = await getUsersById(userData.id);

  if (!user || user?.status === 404) {
    return {
      status: 404,
      message: "User not found!",
    };
  }

  const hashedPassword = getHashedPassword(userData.password);
  if (user.password !== hashedPassword) {
    return {
      status: 404,
      message: "Wrong password!",
    };
  }

  const res = await updateUserById({
    id: userData.id,
    updatedData: { active: true },
  });

  if (res.status !== 200) return res;
  else return { ...res, message: "User signed in successfully!" };
};

const signUserOut = async ({ userData }) => {
  const user = await getUsersById(userData.id);

  if (!user || user?.status === 404) {
    return {
      status: 404,
      message: "User not found!",
    };
  }

  const hashedPassword = getHashedPassword(userData.password);
  if (user.password !== hashedPassword) {
    return {
      status: 404,
      message: "Wrong password!",
    };
  }

  const res = await updateUserById({
    id: userData.id,
    updatedData: { active: false },
  });

  if (res.status !== 200) return res;
  else return { ...res, message: "User signed out successfully!" };
};

module.exports = { registerUser, signUserIn, signUserOut };

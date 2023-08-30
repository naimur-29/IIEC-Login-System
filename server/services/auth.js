const crypto = require("crypto");
const { createUser, getUsersById, updateUserById } = require("./users");
const { read, write, getCurrentDateTime } = require("./records");

const getHashedPassword = (plainPassword) => {
  const secretKey = process.env.HASH_KEY;

  const hmac = crypto.createHmac("sha256", secretKey);
  hmac.update(plainPassword);

  const hashedPassword = hmac.digest("hex");

  return hashedPassword;
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
  const { currentDate, currentTime } = getCurrentDateTime(new Date());
  const res = await updateUserById({
    id: userData.id,
    updatedData: { active: true, lastJoinedAt: currentTime },
  });

  // store records:
  if (res.status !== 200) return res;
  else {
    const data = await read(`./records/${currentDate}.csv`);

    let newData = `${user.id},${user.name},In,${currentTime}\n`;

    if (data !== undefined) {
      await write(`./records/${currentDate}.csv`, data + newData);
    } else {
      await write(
        `./records/${currentDate}.csv`,
        "ID, NAME, ACTIVITY, TIME(MILITARY)\n" + newData
      );
    }

    return { ...res, message: "User signed in successfully!" };
  }
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
  const { currentDate, currentTime } = getCurrentDateTime(new Date());
  const res = await updateUserById({
    id: userData.id,
    updatedData: { active: false, lastJoinedAt: "" },
  });

  // store records:
  if (res.status !== 200) return res;
  else {
    const data = await read(`./records/${currentDate}.csv`);

    let newData = `${user.id},${user.name},Out,${currentTime}\n`;

    if (data !== undefined) {
      await write(`./records/${currentDate}.csv`, data + newData);
    } else {
      await write(
        `./records/${currentDate}.csv`,
        "ID,NAME,ACTIVITY,TIME(MILITARY)\n" + newData
      );
    }

    return { ...res, message: "User signed out successfully!" };
  }
};

// new user register:
const registerUser = async ({ userData }) => {
  const hashedPassword = getHashedPassword(userData.password);
  const { currentDate, currentTime } = getCurrentDateTime(new Date());

  // create user with hashed password:
  const res = await createUser({
    userData: {
      ...userData,
      password: hashedPassword,
      active: false,
      createdAt: "Date:" + currentDate + " Time:" + currentTime,
    },
  });

  // sign user in:
  if (res.status === 200) {
    console.log("doing work!");
    await signUserIn({ userData });
  }

  return res;
};

module.exports = { registerUser, signUserIn, signUserOut };

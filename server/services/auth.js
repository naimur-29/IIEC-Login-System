const crypto = require("crypto");
const { createUser, getUsersById, updateUserById } = require("./users");
const { read, write } = require("./records");

const getCurrentDateTime = (d) => {
  // date:
  const currentDate = d
    .toLocaleString("en-UK", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    })
    .replaceAll("/", "-");

  // time:
  const currentTime = d.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

  return { currentDate, currentTime };
};

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
      message: "Enter the correct ID or GO REGISTER FIRST!",
    };
  }

  // check if user password valid or not:
  const hashedPassword = getHashedPassword(userData.password);
  if (user.password !== hashedPassword) {
    return {
      status: 404,
      message: `Wrong password, mate!`,
    };
  }

  // check if user already signed in or not:
  if (user.active) {
    return {
      status: 200,
      message: `${user.name.split(" ")[0]}, you've already logged in!`,
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
        "ID, NAME, ACTIVITY, TIME\n" + newData
      );
    }

    return {
      ...res,
      message: `Hey ${user.name.split(" ")[0]}, you logged in successfully!`,
    };
  }
};

// user sign Out:
const signUserOut = async ({ userData }) => {
  // see if user id is valid or not:
  const user = await getUsersById(userData.id);

  if (!user || user?.status === 404) {
    return {
      status: 404,
      message: "Enter the correct ID or GO REGISTER FIRST!",
    };
  }

  // check if user password valid or not:
  const hashedPassword = getHashedPassword(userData.password);
  if (user.password !== hashedPassword) {
    return {
      status: 404,
      message: "Wrong password, mate!",
    };
  }

  // check if user already signed out or not:
  if (!user.active) {
    return {
      status: 200,
      message: `${user.name.split(" ")[0]}, you've already logged out!`,
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
        "ID,NAME,ACTIVITY,TIME\n" + newData
      );
    }

    return {
      ...res,
      message: `Hey ${user.name.split(" ")[0]}, you logged out successfully!`,
    };
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
    await signUserIn({ userData });

    const data = await read(`./records/users.csv`);
    let newData = `${userData.id},${userData.name},${userData.department},${userData.designation}\n`;

    if (data !== undefined) {
      await write(`./records/users.csv`, data + newData);
    } else {
      await write(
        `./records/users.csv`,
        "ID,NAME,PROGRAM,IIEC DESIGNATION\n" + newData
      );
    }
  }

  return res;
};

module.exports = { registerUser, signUserIn, signUserOut };

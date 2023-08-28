const fs = require("fs").promises;

const getCurrentDateTime = (d) => {
  // date:
  const day = d.getDate();
  const month = d.getMonth();
  const year = d.getFullYear();
  const currentDate = `${day < 10 ? "0" + day : day}-${
    month < 10 ? "0" + month : month
  }-${year}`;

  // time:
  const hour = d.getHours();
  const min = d.getMinutes();
  const sec = d.getSeconds();
  const currentTime = `${hour < 10 ? "0" + hour : hour}:${
    min < 10 ? "0" + min : min
  }:${sec < 10 ? "0" + sec : sec}`;

  return { currentDate, currentTime };
};

const read = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

const write = async (filePath, data) => {
  try {
    await fs.writeFile(filePath, data, "utf8");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = { getCurrentDateTime, read, write };

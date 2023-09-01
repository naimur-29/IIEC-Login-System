const fs = require("fs").promises;

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

module.exports = { read, write };

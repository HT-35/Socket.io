// format time
const format = require("date-format");

const messageClean = (Textclear) => {
  return {
    Textclear,
    // dùng format-time  npm
    creatAt: format("dd-MM-yyy - hh:mm", new Date()),
  };
};

module.exports = messageClean;

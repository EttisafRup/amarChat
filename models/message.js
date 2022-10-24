const mongoose = require("mongoose");
const Schema = mongoose.Schema({
  userid: {
    type: String,
    trim: true,
  },
  usermsg: {
    type: String,
    trim: true,
  },
  msgdate: {
    type: String,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", Schema);
module.exports = Message;

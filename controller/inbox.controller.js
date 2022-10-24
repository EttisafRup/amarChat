const User = require("../models/people");
const Message = require("../models/message");
const jwt = require("jsonwebtoken");

const inboxController = (req, res, next) => {
  if (!isValidUser) {
    res.render("inbox", {
      title: "Inbox",
    });
  } else {
    res.render("login");
  }
};

const saveMessages = async (req, res) => {
  const theJWTToken = req.signedCookies.amarChat;
  const isValid = jwt.verify(theJWTToken, process.env.JWT_SECRET);
  const isValidUser = await User.findOne({ email: isValid.email });
  res.locals.isValidUser = isValidUser;
  const saveMessage = new Message({
    usermsg: req.body.msg,
    userid: isValidUser._id,
  });
  await saveMessage.save();
  try {
    res.render("inbox");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { inboxController, saveMessages };

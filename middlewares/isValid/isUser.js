const User = require("../../models/people");
const jwt = require("jsonwebtoken");

const isUser = async (req, res, next) => {
  try {
    const theJWTToken = req.signedCookies.amarChat;
    if (theJWTToken == undefined) {
      next();
    }
    if (theJWTToken) {
      const isValid = jwt.verify(theJWTToken, process.env.JWT_SECRET);
      const isValidUser = await User.findOne({ email: isValid.email });
      req.isValidUser = isValidUser;
      res.locals.isValidUser = isValidUser;
      res.render("inbox");
    }
  } catch (err) {
    console.log(err.message);
    res.redirect("/");
  }
};

module.exports = isUser;

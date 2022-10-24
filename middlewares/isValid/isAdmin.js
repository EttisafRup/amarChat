const jwt = require("jsonwebtoken");
const User = require("../../models/people");

const isAdmin = async (req, res, next) => {
  try {
    const jwtToken = req.signedCookies.amarChat;
    const adminJWT = jwt.verify(jwtToken, process.env.JWT_SECRET);
    const findAdmin = await User.findOne({ email: adminJWT.email });
    if (findAdmin.role == "admin") {
      next();
    }
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
};

module.exports = isAdmin;

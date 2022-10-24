const User = require("../models/people");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginController = (req, res) => {
  res.render("login", {
    title: "Login",
  });
};

const checkLogin = async (req, res) => {
  try {
    const checkUser = await User.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    });

    if (checkUser && checkUser._id) {
      const checkPassword = await bcrypt.compare(
        req.body.pw,
        checkUser.password
      );

      if (checkPassword) {
        const cookiesPowder = {
          name: checkUser.name,
          email: checkUser.email,
        };
        const logToken = jwt.sign(cookiesPowder, process.env.JWT_SECRET, {
          expiresIn: process.env.TOKEN_VALID_TIME,
        });

        res.cookie(process.env.TOKEN_NAME, logToken, {
          maxAge: process.env.TOKEN_VALID_TIME,
          httpOnly: true,
          signed: true,
        });
        res.locals.signedUser = cookiesPowder;

        res.redirect("/inbox");
      } else {
        res.end();
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const logOut = (req, res, next) => {
  res.clearCookie(process.env.TOKEN_NAME);
  res.redirect("/");
};

module.exports = { loginController, checkLogin, logOut };

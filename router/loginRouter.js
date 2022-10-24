const express = require("express");
const router = express.Router();
const {
  loginController,
  checkLogin,
  logOut,
} = require("../controller/login.controller");

const {
  loginValidator,
  errorLoginValidator,
} = require("../middlewares/fieldVerifications/login.validation");

const isUser = require("../middlewares/isValid/isUser");

router.get("/", isUser, loginController);
router.post("/", loginValidator, errorLoginValidator, checkLogin);
router.delete("/", logOut);

module.exports = router;

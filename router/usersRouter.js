const express = require("express");
const router = express.Router();
const {
  usersController,
  addUser,
  removeUser,
} = require("../controller/users.controller");

const avatarUploader = require("../middlewares/fieldVerifications/avatar");

const {
  validFields,
  errorValidator,
} = require("../middlewares/fieldVerifications/user.validator");

const isAdmin = require("../middlewares/isValid/isAdmin");
router.get("/", isAdmin, usersController);

router.post("/", avatarUploader, validFields, errorValidator, addUser);

router.delete("/:id", removeUser);

module.exports = router;

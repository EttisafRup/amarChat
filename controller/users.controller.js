const bcrypt = require("bcrypt");
const User = require("../models/people");
const { unlink } = require("fs");

const usersController = async (req, res) => {
  try {
    const getUsers = await User.find();
    res.render("users", {
      title: "Users",
      users: getUsers,
    });
  } catch (err) {
    console.log(err);
    res.json({ error: err.message });
  }
};

const addUser = async (req, res) => {
  let newUser;
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  if (req.files && req.files.length > 0) {
    newUser = new User({
      ...req.body,
      avatar: req.files[0].filename,
      password: hashPassword,
    });
  } else {
    newUser = new User({
      ...req.body,
      password: hashPassword,
    });
  }

  try {
    await newUser.save();
    res.json({
      message: "Successfully Created!",
      user: newUser,
    });
  } catch (err) {
    console.log(err);
    res.json({
      error: err,
    });
  }
};

const removeUser = async (req, res) => {
  try {
    const getUser = await User.findByIdAndDelete({
      _id: req.params.id,
    });

    if (getUser.avatar) {
      unlink(__dirname + `/../public/uploads/avatar/${getUser.avatar}`);
    }

    res.json({ success: "User was deleted successfully!" });
  } catch (err) {
    res.json({ Falied: "Failed to delete the User!", error: err.message });
  }
};

module.exports = { usersController, addUser, removeUser };

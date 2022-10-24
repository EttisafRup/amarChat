const express = require("express");
const router = express.Router();
const {
  inboxController,
  saveMessages,
} = require("../controller/inbox.controller");
const isUser = require("../middlewares/isValid/isUser");

router.get("/", isUser, inboxController);
router.post("/", saveMessages);

module.exports = router;

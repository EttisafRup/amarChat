const express = require("express");
const router = express.Router();
const getMessages = require("../controller/message.controller.js");
router.post("/", getMessages);

module.exports = router;

const getMessages = async (req, res) => {
  const Message = require("../models/message");
  const allData = await Message.find({});

  try {
    res.json({
      sent: allData,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = getMessages;

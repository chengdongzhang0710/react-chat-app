const Message = require("../models/messageModel");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Message.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) {
      return res.json({ status: true });
    } else {
      return res.json({ status: false });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await Message.find({ users: { $all: [from, to] } }).sort({ updatedAt: 1 });
    const projectedMessages = messages.map(item => {
      return {
        fromSelf: item.sender.toString() === from,
        message: item.message.text,
      };
    });
    return res.json(projectedMessages);
  } catch (error) {
    next(error);
  }
};

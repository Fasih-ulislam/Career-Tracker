const Message = require("../models/MessageModel");
const { findUserByEmail } = require("../services/userService");

const createMessage = async (msgDetails, userEmail) => {
  const user = await findUserByEmail(userEmail);

  const msg = new Message({
    userId: user._id,
    msg: msgDetails.msg,
    user: msgDetails.user,
    avatar: msgDetails.avatar,
    timestamp: msgDetails.timestamp,
  });

  await msg.save();
};

const getRecentMessages = async () => {
  const activity = await Message.find()
    .sort({ timestamp: -1 })
    .limit(20)
    .select("user avatar timestamp msg ");

  return activity;
};
module.exports = { createMessage, getRecentMessages };

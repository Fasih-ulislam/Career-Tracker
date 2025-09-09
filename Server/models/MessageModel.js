const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  user: {
    type: String,
    required: [true, "User is required"],
  },
  msg: {
    type: String,
    required: [true, "Message is required"],
  },
  avatar: {
    type: String,
    required: [true, "Avatar is required"],
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Message", MessageSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Create Schema
const MessagesSchema = new Schema({
  UserId: {
    type: Number,
    required: true
  },
  MessageName: {
    type: String,
    required: true
  },
  Text: {
    type: String,
    required: true
  }
});

module.exports = Messages = mongoose.model("Messages", MessagesSchema, "Messages");

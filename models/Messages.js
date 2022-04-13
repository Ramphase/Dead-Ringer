const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Create Schema
const MessagesSchema = new Schema({
  UserId: {
    type: Number,
    required: true
  },
  MessageName: {
    type: Number,
    required: true
  },
  Test: {
    type: String,
    required: true
  }
});

module.exports = Messages = mongoose.model("Messages", MessagesSchema, "Messages");
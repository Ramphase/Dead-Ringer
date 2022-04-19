const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Create Schema
const TriggersSchema = new Schema({
  UserId: {
    type: Number,
    required: true
  },
  TriggerName: {
    type: String,
    required: true
  },
  Message: {
    type: String,
    required: true
  },
  Contact: {
    type: [Number],
    required: true
  }
});

module.exports = Triggers = mongoose.model("Triggers", TriggersSchema, "Triggers");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Create Schema
const UserSchema = new Schema({
  UserId: {
    type: Number
  },
  FirstName: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  EmailToken: {
    type: String
  },
  IsVerified: {
    type: Boolean
  },
  Login: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  }
});

module.exports = Users = mongoose.model("Users", UserSchema, "Users");
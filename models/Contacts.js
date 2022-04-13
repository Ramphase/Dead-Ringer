const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Create Schema
const ContactsSchema = new Schema({
  ContactId: {
    type: Number
  },
  UserId: {
    type: Number,
    required: true
  },
  FirstName: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    required: false
  },
  Email: {
    type: String,
    required: true
  },
  PhoneNumber: {
    type: String,
    required: true
  }
});

module.exports = Contacts = mongoose.model("Contacts", ContactsSchema, "Contacts");

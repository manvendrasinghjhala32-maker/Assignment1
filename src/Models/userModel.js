const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    minLength: 11,
    maxLength: 30,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: function (value) {
        return value.endsWith("@gmail.com");
      },
      message: "Only Gmail addresses are allowed.",
    },
  },
  password: {
    type: String,
    minLength: 8,
    maxLength: 200,
    required: true,
    trim: true,
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
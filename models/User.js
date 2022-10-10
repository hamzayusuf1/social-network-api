const { Schema, model } = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new Schema({
  username: { type: String, required: true, trim: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, "Invalid email address"],
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "thoughts",
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

// Virtual (Create a virtual called friendCount that retrieves the length of the user's friends array field on query.)

const User = model("user", userSchema);

module.exports = User;

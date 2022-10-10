const { Schema, model } = require("mongoose");
const User = require("./User");

const reactionSchema = new Schema({
  reactionId: {},
  reactionBody: { type: String, required: true, maxlength: 280 },
  username: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const thoughtsSchema = new Schema({
  thoughtsText: { type: String, required: true, minLength: 1, maxlength: 280 },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: [User], //not sure
  reactions: [reactionSchema],
});

const Thoughts = model("thoughts", thoughtsSchema);

const { Schema, model } = require("mongoose");
const User = require("./User");
const reactionSchema = require("./Reaction");

const thoughtsSchema = new Schema(
  {
    thoughtsText: {
      type: String,
      required: true,
      minLength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: { type: String, required: true },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtsSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thoughts", thoughtsSchema);

module.exports = Thought;

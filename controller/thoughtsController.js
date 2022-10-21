const Thought = require("../models/Thoughts");
const Thoughts = require("../models/Thoughts");
const User = require("../models/User");

//TODO: ADD ALL THE FRIEND/REACTIONS SCHEMAS AND ROUTES AND VIRTUALS

module.exports = {
  getThoughts(req, res) {
    Thoughts.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought({ params }, res) {
    Thoughts.findOne({ _id: params.id }).then((thought) =>
      !thought
        ? res.status(404).json({ message: "No thought with that ID" })
        : res.json(thought)
    );
  },
  createThought(req, res) {
    Thoughts.create(req.body)
      .then((thought) => {
        User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "Thought created, but found no user with that ID",
            })
          : res.json("Created the thought 🎉")
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  deleteThought(req, res) {
    Thoughts.findOneAndDelete({ _id: req.params.thoughtId }).then(
      !thought
        ? res
            .status(404)
            .json({ message: "No thought with that ID exists in our database" })
        : res.json("Thought has been deleted")
    );
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: body.reactionId } } },
      { new: true, runValidators: true }
    ),
      then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thought with that id found" });
          return;
        }
        res.json(thought);
      }).catch((err) => {
        res.status(500).json(err);
      });
  },
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: body.reactionId } } },
      { new: true, runValidators: true }
    )
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thought found with this id" });
          return;
        }
        res.json({ message: "Reaction deleted" });
      })
      .catch((err) => res.status(500).json(err));
  },
};

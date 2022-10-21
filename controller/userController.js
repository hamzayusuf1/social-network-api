const User = require("../models/User");
const Thoughts = require("../models/Thoughts");

module.exports = {
  getUsers(req, res) {
    User.find()
      .populate("thoughts")
      .populate("friends")
      .select("-__v")
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate("thoughts")
      .populate("friends")
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  deleteUser(req, res) {
    User.findByIdAndDelete({ _id: req.params.userId })
      .then((user) => {
        !user
          ? res
              .status(404)
              .json({ message: "No user with that ID exists in our database" })
          : Thoughts.deleteMany({ _id: { $in: user.thoughts } });
      })
      .then(() =>
        res.json({ message: "User and associated thoughts deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    )
      .then((user) => {
        !user
          ? res
              .status(404)
              .json({ message: "No user with that ID exists in our database" })
          : res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true, runValidators: true }
    )
      .then((user) => {
        !user
          ? res
              .status(404)
              .json({ message: "No user with that id in our database" })
          : res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true, runValidators: true }
    ).then((user) => {
      !user
        ? res
            .status(404)
            .json({ message: "No user with that Id in our database" })
        : res.json({ message: "Friend deleted" });
    });
  },
};

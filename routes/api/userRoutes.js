const router = require("express").Router();

const {
  createUser,
  getUsers,
  getSingleUser,
  deleteUser,
  updateUser,
} = require("../../controller/userController");

// api/users
router.route("/").get(getUsers).post(createUser);

//api/users/:userId
router.route("/:userId").get(getSingleUser).delete(deleteUser).post(updateUser);

//DO THE UPDATE/PUT REQUEST FOR THE USER ROUTES

module.exports = router;

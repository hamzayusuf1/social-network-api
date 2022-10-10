const router = require("express").Router();

const { createUser, getUsers } = require("../../controller/userController");

router.route("/").get(getUsers).post(createUser);

module.exports = router;

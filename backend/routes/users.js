const { Router } = require("express");
const router = Router();
const userController = require("../controllers/userController");

router.get("/", (req, res) => {
  const usersList = userController.searchUsers();
  usersList
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json(error.message));
});

router.post("/", (req, res) => {
  const newUser = req.body;
  const user = userController.createUser(newUser);
  user
    .then((userCreated) => res.status(201).json(userCreated))
    .catch((error) => res.status(400).json(error.message));
});

module.exports = router;

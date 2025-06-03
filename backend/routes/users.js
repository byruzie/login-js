const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", async (req, res) => {
  try {
    const users = await userController.searchUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const newUser = req.body;
    const userCreated = await userController.createUser(newUser);
    res.status(201).json(userCreated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userController.verifyLogin(email, password);
    if (!user) return res.status(401).json({ error: "Email ou senha incorretos." });
    res.status(200).json({ message: "Login bem-sucedido", user });
  } catch (err) {
    res.status(500).json({ error: "Erro ao fazer login" });
  }
});

module.exports = router;


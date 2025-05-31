const { Router } = require("express");
const router = Router();
const userController = require("../controllers/userController");

router.get("/", (req, res) => {
  const usersList = userController.searchUsers();
  usersList
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json(error.message));
});

router.post("/signup", (req, res) => {
  const newUser = req.body;
  const user = userController.createUser(newUser);
  user
    .then((userCreated) => res.status(201).json(userCreated))
    .catch((error) => res.status(400).json(error.message));
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await userController.verifyLogin(email, password);
    if (!user) {
      return res.status(401).json({ error: "Email ou senha incorretos." });
    }

    res.status(200).json({ message: "Login bem-sucedido", user });
  } catch (err) {
    res.status(500).json({ error: "Erro ao fazer login" });
  }
});

module.exports = router;

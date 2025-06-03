const express = require("express");
const cors = require("cors");
const app = express();

const router = require("./routes/index");
const connection = require("./db/connection");
const tables = require("./db/tables");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Banco de dados e rotas
tables.init(connection);
router(app);

// Rota raiz (teste no Railway)
app.get("/", (req, res) => {
  res.send("Servidor está rodando! 🚀");
});

// Inicializa o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

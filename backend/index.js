const express = require("express");
const cors = require("cors");
const app = express();

// Configura CORS para aceitar requisições do seu frontend
app.use(cors({
  origin: "https://byruzie.github.io",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Para garantir que o servidor responda ao preflight OPTIONS
app.options("*", cors());

app.use(express.json());

// suas rotas aqui

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

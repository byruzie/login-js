const express = require("express");
const cors = require("cors");
const app = express();
const connection = require("./db/connection");
const tables = require("./db/tables");
const userRoutes = require("./routes/userRoutes");

app.use(cors({
  origin: "https://byruzie.github.io"
}));
app.use(express.json());

tables.init(connection);

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

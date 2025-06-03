const express = require("express");
const cors = require("cors");
const app = express();

const router = require("./routes/index");
const connection = require("./db/connection");
const tables = require("./db/tables");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

tables.init(connection);
router(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

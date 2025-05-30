const express = require("express");
const app = express();
const port = 3000;
const router = require("./routes/index");
const connection = require("./db/connection");
const tables = require("./db/tables");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

tables.init(connection);
router(app);

app.listen(port, (error) => {
    if(error) {
        console.log('deu erro');
        return
    }
    console.log('subiu');
})
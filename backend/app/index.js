const PORTA = 3000;

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require('../database');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", require("./routes/  routes"));


app.listen(PORTA, () => {
    console.log('Servidor iniciado na porta ' + PORTA);
});
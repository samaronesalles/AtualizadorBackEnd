const PORTA = 3000;

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Depois refatorar usando esse ORM que funciona em MySQL.
// Documentação: https://sequelize.org/v5/
// Obs.: Já adicionei nas dependencias
//
// const { Sequelize, Model, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", require("./routes/routes"));
app.use(cors());

app.listen(PORTA, () => {
    console.log('Servidor iniciado na porta ' + PORTA);
});
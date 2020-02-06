const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../app/models/User');
const Department = require('../app/models/Department');


const connection = new Sequelize(dbConfig);

User.init(connection);
Department.init(connection);

User.associate(connection.models);

module.exports = connection;

// Comandos para não esquecer: 
// 1º Comando: yarn sequelize migration:create --name=[nome qualquer - sugestão: "create-xxxx" / "alter-xxxx" / "new-field-xxxx"]
//       - Isto fará com que seja criado um arquivo na pasta migrations.
// 2º edito a nova migrate que foi criada 
// 3º Comando: yarn sequelize db:migration 
//       - Isto fará com que uma instrução create table seja executada no sgbd.
//
// Para ver todos os comando disponíveis: yarn sequelize -help
const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../app/models/User');
const Department = require('../app/models/Department');
const Customer = require('../app/models/Customer');
const Address = require('../app/models/Address');
const City = require('../app/models/City');
const TypesUpdate = require('../app/models/TypesUpdate');
const Modules = require('../app/models/Module');
const Version = require('../app/models/Version');

const connection = new Sequelize(dbConfig);

User.init(connection);
Department.init(connection);
Customer.init(connection);
Address.init(connection);
City.init(connection);
TypesUpdate.init(connection);
Modules.init(connection);
Version.init(connection);

User.associate(connection.models);
Address.associate(connection.models);
Customer.associate(connection.models);
Version.associate(connection.models);

module.exports = connection;

// Comandos para não esquecer: 
// 1º Comando: yarn sequelize migration:create --name=[nome qualquer - sugestão: "create-xxxx" / "alter-xxxx" / "new-field-xxxx"]
//       - Isto fará com que seja criado um arquivo na pasta migrations.
// 2º edito a nova migrate que foi criada 
// 3º Comando: yarn sequelize db:migration 
//       - Isto fará com que uma instrução create table seja executada no sgbd.
// 4º Comando: yarn sequelize db:seed:all
//       - Isto executará as seeds (inserts iniciais) nas tabelas que as possuem
// Para ver todos os comando disponíveis: yarn sequelize -help
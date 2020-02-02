// const SettingsDB = require('../../config/database.js');

// const Sequelize = require('sequelize');
// const connection = new Sequelize(SettingsDB.StringConnectionDB());

// class userDAO {

//     constructor() {  // Testado: OK
//         this._user = connection.define('users', {
//             name: {
//                 type: Sequelize.STRING,
//                 allowNull: false,
//                 require: true
//             },
//             login: {
//                 type: Sequelize.STRING,
//                 allowNull: false,
//                 require: true
//             },
//             password: {
//                 type: Sequelize.STRING,
//                 allowNull: false,
//                 require: true
//             }
//         }, {
//             // options
//         });

//         this._user.sync();
//     }

//     async CreateUser(user_req, res) {  // Testado: OK
//         console.log('chegou em "models>userDAO.CreateUser"');

//         await connection.authenticate()
//             .then(() => { console.log('Connection has been established successfully with MySQL.'); })
//             .catch(err => { console.error('Unable to connect to the database:', err); });

//         const user = await this._user.create(user_req);

//         if (!user) {
//             return 'not find'
//         }

//         return user.dataValues;
//     }

//     async ReadUsers(req, res) {        // Testado: OK
//         console.log('chegou em "models>userDAO.ReadUsers"');

//         await connection.authenticate()
//             .then(() => { console.log('Connection has been established successfully with MySQL.'); })
//             .catch(err => { console.error('Unable to connect to the database:', err); });

//         const users = await this._user.findAll({ raw: true });

//         if (!users) {
//             return 'not find'
//         }

//         return users;
//     }

//     async ReadUser(req, res) {         // Testado: OK
//         console.log('chegou em "models>userDAO.ReadUser"');

//         await connection.authenticate()
//             .then(() => { console.log('Connection has been established successfully with MySQL.'); })
//             .catch(err => { console.error('Unable to connect to the database:', err); });

//         console.log('procurando por: ' + req.params.id);
//         const user = await this._user.findOne({ where: { id: req.params.id } });

//         if (!user) {
//             return 'not find'
//         }
//         return user.dataValues;
//     }

//     async UpdateUser(req, res) {       // Testado: OK, só não deu retorno do novo registro
//         console.log('chegou em "models>userDAO.UpdateUser"');

//         await connection.authenticate()
//             .then(() => { console.log('Connection has been established successfully with MySQL.'); })
//             .catch(err => { console.error('Unable to connect to the database:', err); });

//         console.log('procurando por: ' + req.params.id);

//         const user = await this._user.update({
//             name: req.body.name,             // Pesquisar depois como fazer em single sintaxe...
//             login: req.body.login,
//             password: req.body.password
//         }, {
//             where: {
//                 id: req.params.id
//             },
//             returning: true,
//             plain: true
//         });

//         console.log(user);

//         if (!user) {
//             return 'not find'
//         }
//         return user.dataValues;
//     }

//     async DeleteUser_ById(req, res) {  // Testado: OK
//         console.log('chegou em "models>userDAO.DeleteUser_ById"');

//         const idx = req.params.id;

//         if (idx <= 0)
//             return;

//         await connection.authenticate()
//             .then(() => { console.log('Connection has been established successfully with MySQL.'); })
//             .catch(err => { console.error('Unable to connect to the database:', err); });

//         await this._user.destroy({
//             where: {
//                 id: idx
//             }
//         }).then(() => {
//             console.log(`User id '${idx}' deleted`);
//         });

//     }

// }

// module.exports = userDAO;

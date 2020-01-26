const execSQLQuery = require('../config/execSQLQuery');

class usuarioDAO {

    SaveUser(user, req, res) {
        console.log('chegou em "models>SaveUser"');

        const sql = `insert into USERS(nome, login, senha) values ('${user.nome}', '${user.login}', '${user.senha}')`;

        const SQL_Query = new execSQLQuery;
        SQL_Query.Exec(sql, res);
    }

}

module.exports = usuarioDAO;

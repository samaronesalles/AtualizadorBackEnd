var mysql = require('mysql');

var connMySQL = function () {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'h12l99',
        database: 'AtualizadorLBC'
    });
}

module.exports = function () {
    return connMySQL;
}


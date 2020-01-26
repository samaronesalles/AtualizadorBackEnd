
const mysql = require('mysql');

class execSQLQuery {

    constructor() {
        this._connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            port: 3306,
            password: 'h12l99',
            database: 'atualizadorlbc'
        });
    };

    Exec(sqlQry, res) {

        console.log('chegou em "config>execSQLQuery.Exec"');

        this._connection.connect(function (err) {
            if (!err)
                console.log("MySql is Connected");
            else {
                const msg = "MySql is not connected";
                res.json({ result: msg });
                console.log(msg);
            }
        });

        this._connection.query(sqlQry, function (error, results, fields) {

            console.log(sqlQry);

            if (error)
                res.json(error);
            else
                res.json(results);

            this._connection.end();
        });

    }
}

module.exports = execSQLQuery;
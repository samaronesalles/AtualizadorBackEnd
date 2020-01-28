const driver = 'mysql';
const host = 'localhost';
const user = 'root';
const port = 3306;
const password = 'h12l99';
const database = 'atualizadorlbc';

module.exports.driver = function () { return driver };
module.exports.host = function () { return host };
module.exports.user = function () { return user };
module.exports.port = function () { return port };
module.exports.password = function () { return password };
module.exports.database = function () { return database };

module.exports.StringConnectionDB = function () {
    return `${driver}://${user}:${password}@${host}:${port}/${database}`;
}
function usuarioDAO(connection) {
    this._connection = connection;
}

usuarioDAO.prototype.SaveUser = function (user) {
    // this._connection.query('insert into USERS set ?', user);
    console.log('chegou em "SaveUser"');
}

module.exports = function () {
    return usuarioDAO;
}
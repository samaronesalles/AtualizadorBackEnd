const { Model, DataTypes } = require('sequelize');

//const { Sequelize, Model, DataTypes } = require('sequelize');
//var EncryptedField = require('sequelize-encrypted');

//var key = 'TW9yZW5hIGRvIHNvZsOhIGRvIFBlZHJvLi4ga2tra2traw=='; 
//var enc_fields = EncryptedField(Sequelize, key);

// Estudar melhor no link "https://github.com/defunctzombie/sequelize-encrypted" para cryptografar a senha...

class User extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
        }, {
            sequelize
        })
    }
}

module.exports = User;
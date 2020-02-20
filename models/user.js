const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isAlphanumeric: true,
                len: [6, 20],
                notEmpty: true
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
                notEmpty: true,
                len: [1, 255]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6, Infinity],
                notEmpty: true
            }
        }
    });

    User.generateHash = function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };

    const encryptPassword = function (user) {
        user.password = User.generateHash(user.password);
    };

    User.beforeCreate(encryptPassword);

    User.prototype.validPassword = function (enteredPassword) {
        return bcrypt.compareSync(enteredPassword, this.password);
    };
    User.associate = (models) => {
        User.hasMany(models.Post, {
            onDelete: "cascade"
        });
    };
    return User;
};
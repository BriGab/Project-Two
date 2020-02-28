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
    // this is a thing (hook? method? I'm not sure) to create an encrypted password using bcrypt
    User.generateHash = function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };

    // this equates the user.password with the hashed password
    const encryptPassword = function (user) {
        user.password = User.generateHash(user.password);
    };
    // this uses the beforeCreate function to encrypt the password entered by the user when they sign up into an encrypted version stored in the db
    User.beforeCreate(encryptPassword);
    // this is a function used to validate the password by encrypting user input and checking it against the stored encrypted password to see if they're the same
    User.prototype.validPassword = function (enteredPassword) {
        return bcrypt.compareSync(enteredPassword, this.password);
    };
    // this connects User to Post
    User.associate = (models) => {
        User.hasMany(models.Post, {
            onDelete: "CASCADE"
        });
    };
    return User;
};

/* json example:
{
    "username": "",
    "name": "",
    "email": "",
    "password": "[unencrypted password]"
}

mySQL table example:

id: 1
username: coolUser
name: Cool Name
email: some@email.com
password: [encrypted password],
createdAt: current timestamp
updatedAt: current timestamp
*/
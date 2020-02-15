module.exports = function(sequelize, DataTypes) {
    const Author = sequelize.define("Author", {
        username: {
            type: DataTypes.STRING,
            notNull: true,
            validate: {
                isAlphanumeric: true,
                len: [6, 20]
            }
        },
        name: {
            type: DataTypes.STRING,
            isNull: true
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                len: [6]
            },
            // sets a function that encrypts the password I think?
            get() {
                return () => this.getDataValue("password");
            }
        },
        salt: {
            type: DataTypes.STRING,
            get() {
                // sets a function that checks to make sure the password matches the encryption I think?
                return () => this.getDataValue("salt");
            }
        }
    });

    Author.associate = (models) => {
        Author.hasMany(models.Post, {
            foreignKey: {
                notNull: true
            }
        });
    };

    return Author;
};
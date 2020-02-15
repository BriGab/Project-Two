module.exports = (sequelize, DataTypes) {
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
            type: Sequelize.STRING,
            validate: {
                len: [6]
            },
            get() {
                return () => this.getDataValue('password')
            }
        },
        salt: {
            type: Sequelize.STRING,
            get() {
                return () => this.getDataValue('salt')
            }
        }
    });

    Author.associate = (models) => {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Authors.hasMany(models.Post, {
            foreignKey: {
                notNull: true
            }
        });
    };

    return Author;
}
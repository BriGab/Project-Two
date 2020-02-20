module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("Post", {
        title: {
            type: DataTypes.STRING,
            validate: {
                len: [0, 200]
            }
        },
        body: DataTypes.TEXT
    });
    Post.associate = (models) => {
        Post.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
        Post.belongsTo(models.Mood, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Post;
};
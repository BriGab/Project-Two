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
        Post.belongsTo(models.Author, {
            foreignKey: {
                notNull: true
            }
        });
        Post.belongsTo(models.Mood, {
            foreignKey: {
                notNull: true
            }
        });
    };

    return Post;
};
module.exports = (sequelize, DataTypes) {
    const Post = sequelize.define("Post", {
        title: {
            type: DataTypes.STRING,
            validate: {
                len: [0, 200]
            }
        },
        body: DataTypes.TEXT
    })
    Post.associate = function (models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Post.belongsTo(models.Author, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Post;
}
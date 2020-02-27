module.exports = function (sequelize, DataTypes) {
    const Comment = sequelize.define("Comment", {
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });

    Comment.associate = models => {
        Comment.belongsTo(models.Post, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Comment;
}
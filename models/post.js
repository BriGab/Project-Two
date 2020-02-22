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

/* json example:
"title: "",
"body": ""

mySQL table example
id: 1,
title: this is a blog post,
body: this is the body of a post. it can be long,
UserId: 1,
MoodId: 3,
createdAt: current timestamp,
updatedAt: current timestamp */
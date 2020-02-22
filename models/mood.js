module.exports = (sequelize, DataTypes) => {
    const Mood = sequelize.define("Mood", {
        mood: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: true,
            }
        },
        color: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });
    // connects Mood to Post
    Mood.associate = (models) => {
        Mood.hasMany(models.Post);
    };

    return Mood;
};

/* json example of this table model (data that will be entered by us/the user)
{
    "mood": "Happy,
    "color": "yellow"
}

mySQL table example

id: 1
mood: Happy
color: yellow
createdAt: current timestamp
updatedAtL current timestamp*/
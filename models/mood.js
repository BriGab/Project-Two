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

    Mood.associate = (models) => {
        Mood.hasMany(models.Post);
    };

    return Mood;
};
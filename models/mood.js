module.exports = (sequelize, DataTypes) => {
    const Mood = sequelize.define("Mood", {
        mood: {
            type: DataTypes.STRING,
            notNull: true,
            validate: {
                isAlpha: true,
            },
            color: {
                type: DataTypes.TEXT,
                notNull: true
            }
        }
    });
    return Mood;
};
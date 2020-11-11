const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Tag = sequelize.define('tag', {
        name: {
            type: DataTypes.STRING,
        },
    });

    return Tag;
};
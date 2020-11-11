const {
    DB, dialect, HOST, PASSWORD, pool, USER
} = require('../config/db.config');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(DB, USER, PASSWORD, {
    host: HOST,
    dialect: dialect,
    operatorsAliases: false,
    pool,
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.tutorial = require('./tutorial.model')(sequelize);
db.tag = require('./tag.model')(sequelize);

db.tag.belongsToMany(db.tutorial, {
    through: 'tutorial_tag',
    as: 'tutorials',
    foreignKey: 'tag_id'
});

db.tutorial.belongsToMany(db.tag, {
    through: 'tutorial_tag',
    as: 'tags',
    foreignKey: 'tutorial_id',
});

module.exports = db;

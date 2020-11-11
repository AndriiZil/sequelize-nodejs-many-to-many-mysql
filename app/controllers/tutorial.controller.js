const db = require('../models');
const Tutorial = db.tutorial;
const Tag = db.tag;

exports.create = async (tutorial) => {
    try {
        const { title, description } = tutorial;

        return Tutorial.create({
            title,
            description
        });
    } catch (err) {
        console.log(err);
    }
};

exports.findAll = async () => {
    try {
        return Tutorial.findAll({
            include: [{
                model: Tag,
                as: 'tags',
                attributes: ['id', 'name'],
                through: {
                    attributes: []
                },
                // through: {
                //   attributes: ["tag_id", "tutorial_id"],
                // },
            }]
        });
    } catch (err) {
        console.log(err);
    }
};

exports.findOne = async (id) => {
    try {
        return Tutorial.findByPk(id, {
            include: [{
                model: Tag,
                as: 'tags',
                attributes: ['id', 'name'],
                through: {
                    attributes: [],
                },
                // through: {
                //   attributes: ["tag_id", "tutorial_id"],
                // },
            }]
        });
    } catch (err) {
        console.log(err);
    }
};

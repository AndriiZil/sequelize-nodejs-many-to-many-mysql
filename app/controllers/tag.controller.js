const db = require('../models');
const Tag = db.tag;
const Tutorial = db.tutorial;

exports.create = async (tag) => {
    try {
        return Tag.create({ name: tag.name });

    } catch (err) {
        console.log(err);
    }
}

exports.findAllTags = async () => {
    try {
        return Tag.findAll({
            include: [{
                model: Tutorial,
                as: 'tutorials',
                attributes: ['id', 'title', 'description'],
                through: {
                    attributes: []
                }
            }]
        });
    } catch (err) {
        console.log(err);
    }
}

exports.findTagById = async (id) => {
    try {
        return Tag.findByPk(id, {
            include: [{
                model: Tutorial,
                as: 'tutorials',
                attributes: ['id', 'title', 'description'],
                through: {
                    attributes: []
                }
            }]
        })
    } catch (err) {
        console.log(err);
    }
}

exports.addTutorial = async (tagId, tutorialId) => {
    try {
        const tag = await Tag.findByPk(tagId);
        const tutorial = await Tutorial.findByPk(tutorialId);

        await tag.addTutorial(tutorial);

        return tag;
    } catch (err) {
        console.log(err);
    }
}

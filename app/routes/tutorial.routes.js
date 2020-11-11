module.exports = app => {

    const tutorialController = require('../controllers/tutorial.controller');
    const tagController = require('../controllers/tag.controller');

    const router = require('express').Router();

    router.get('/test', (req, res) => res.send('ok'));

    router.post('/', async (req, res, next) => {
        try {
            const { tagName, title, description } = req.body;

            const tutorial = await tutorialController.create({ title, description });
            const tag = await tagController.create({ name: tagName });

            await tagController.addTutorial(tag.id, tutorial.id);

            return res.send({ message: 'success' });
        } catch (err) {
            next(err);
        }
    });

    router.get('/tags', async (req, res, next) => {
        try {
            const data = await tagController.findAllTags();

            return res.send(data);
        } catch (err) {
            next(err);
        }
    });

    router.get('/tags/:id', async (req, res, next) => {
        try {
            const { id } = req.params;

            const data = await tagController.findTagById(id);

            return res.send(data);
        } catch (err) {
            next(err);
        }
    });

    router.get('/tutorials', async (req, res, next) => {
        try {
            const data = await tutorialController.findAll();

            return res.send(data);
        } catch (err) {
            next(err);
        }
    });

    router.get('/tutorials/:id', async (req, res, next) => {
        try {
            const { id } = req.params;

            const data = await tutorialController.findOne(id);

            return res.send(data);
        } catch (err) {
            next(err);
        }
    });


    app.use('/api', router);

};

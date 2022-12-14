const error = require('../middleware/error');

const EventController = require('../controllers/event.controller');

exports.routesConfig = (app) => {
    app.post('/events', EventController.post);
    app.get('/events', EventController.getAll);
    app.get('/events/:sessionId', EventController.getBySessionId);
    // app.put('/events/:sessionId', EventController.putById);
    app.delete('/events/:sessionId', EventController.deleteBySessionId);
    app.use(error);
};



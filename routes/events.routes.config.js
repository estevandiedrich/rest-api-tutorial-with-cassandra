const EventController = require('../controllers/event.controller');

exports.routesConfig = (app) => {
    app.post('/events', EventController.post);
    app.get('/events', EventController.getAll);
    app.get('/events/:sessionId', EventController.getBySessionId);
    // app.put('/events/:id', EventController.putById);
    app.delete('/events/:sessionId', EventController.deleteBySessionId);
};
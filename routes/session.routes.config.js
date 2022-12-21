const error = require('../middleware/error');

const EventController = require('../controllers/event.controller');

exports.routesConfig = (app) => {
    app.post('/sessions', EventController.post);
    app.get('/sessions', EventController.getAll);
    app.get('/sessions/:sessionId', EventController.getBySessionId);
    // app.put('/sessions/:sessionId', EventController.putById);
    app.delete('/sessions/:sessionId', EventController.deleteBySessionId);
    app.use(error);
};



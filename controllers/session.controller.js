const models = require('../services/cassandra-express.service');

const getAll = (req, res) => {
    models.instance.Event.find({ $limit: 10 }, (err, list) => {
        if (err) {
            console.log(err);
            res.status(500).send({ error: 'Internal server error' });
            return;
        }
        res.status(200).send(list);
    });
};

const getBySessionId = (req, res) => {
    models.instance.Event.find({ sessionId: models.uuidFromString(req.params.sessionId) }, (err, list) => {
        if (err) {
            console.log(err);
            res.status(500).send({ error: 'Internal server error' });
            return;
        }
        if (list.length == 0) {
            res.status(404).send();
            return;
        }
        res.status(200).send(list);
    });
};

const post = (req, res) => {
    let event = new models.instance.Event({
        eventName: req.body.eventName,
        eventType: req.body.eventType,
        sessionId: models.uuidFromString(req.body.sessionId),
        payload: req.body.payload,
        eventKey: req.body.eventKey,
        createdAt: Date.now()
    });
    event.save((err) => {
        if (err) {
            throw new Error(err);
        }
        res.status(201).send({ event: event });
        console.log('Event saved');
    });
};

// const putById = (req, res, next) => {
//     let eventToUpdate;
//     models.instance.Event.find({ sessionId: models.uuidFromString(req.params.sessionId) }, (err, list) => {
//         if (err) {
//             console.log(err);
//             res.status(500).send({ error: 'Internal server error' });
//             return;
//         }
//         if (list.length == 0) {
//             res.status(404).send();
//             return;
//         }
//         res.status(200).send(list);
//     });

//     let event = new models.instance.Event({
//         eventType: req.body.eventType,
//         payload: req.body.payload,
//         eventKey: req.body.eventKey
//     });

//     models.instance.Event.update({ sessionId: models.uuidFromString(req.params.sessionId), eventName: req.body.eventName }, req.body, (err) => {
//         if (err) {
//             console.log(err);
//             res.status(501).send({ error: 'Internal server error' });
//             return;
//         }
//         res.status(201).send({ event: event });
//         console.log('person updated!');
//     });
// };

const deleteBySessionId = (req, res, next) => {
    models.instance.Event.delete({ sessionId: models.uuidFromString(req.params.sessionId) }, (err) => {
        if (err) {
            console.log(err);
            res.status(500).send({ error: 'Internal server error' });
            return;
        }
        res.status(200).send();
        console.log('Event deleted');
    });
};

module.exports = {
    getAll,
    getBySessionId,
    post,
    // putById,
    deleteBySessionId
}

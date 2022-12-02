const eventService = require("../services/events.service");

const getAll = async (req, res) => {
   var count = req.query.count;
   const users = await eventService.getAll(count);
   res.send(users);
};

const getById = async (req, res) => {
   var id = req.params.id;
   const user = await eventService.getById(id);
   res.send(user);
};

const post = async (req, res, next) => {
   var id = req.body.id;
   var eventName = req.body.event_name;
   var eventType = req.body.event_type;
   var sessionId = req.body.session_id;
   var payload = req.body.payload;
   var eventKey = req.body.event_key;
   const user = await eventService.post(id, eventName, eventType, sessionId, payload, eventKey);
   res.send(user);
};

const putById = async (req, res, next) => {
   var id = req.body.id;
   var eventName = req.body.event_name;
   var eventType = req.body.event_type;
   var sessionId = req.body.session_id;
   var payload = req.body.payload;
   var eventKey = req.body.event_key;
   const user = await eventService.putById(id, eventName, eventType, sessionId, payload, eventKey);
   res.send(user);
};

const deleteById = async (req, res, next) => {
   var id = req.params.id;
   const user = await eventService.deleteById(id);
   res.send(user);
};

module.exports = {
   getAll,
   getById,
   post,
   putById,
   deleteById
}

const models = require('../services/cassandra-express.service');

const getAll = (req, res) => {
   models.instance.Event.find({$limit:10}, (err,list) => {
      if(err){
          console.log(err);
          res.status(501).send({error: 'Internal server error'});
          return;
      }
      res.status(200).send(list);
      console.log('Event list');
  });
};

const getBySessionId = (req, res) => {
   models.instance.Event.find({sessionId:models.uuidFromString(req.params.sessionId)}, (err,list) => {
      if(err){
          console.log(err);
          res.status(501).send({error: 'Internal server error'});
          return;
      }
      res.status(200).send(list);
      console.log('Event');
  });
};

const post = (req, res, next) => {
   let event = new models.instance.Event({
      eventName: req.body.eventName,
      eventType: req.body.eventType,
      sessionId: models.uuidFromString(req.body.sessionId),
      payload: req.body.payload,
      eventKey: req.body.eventKey,
      createdAt: Date.now()
  });
  event.save((err) => {
      if(err) {
          console.log(err);
          res.status(501).send({error: 'Internal server error'});
          return;
      }
      res.status(201).send({event: event});
      console.log('Event saved');
  });
};

const putById = (req, res, next) => {
   var id = req.body.id;
   var eventName = req.body.event_name;
   var eventType = req.body.event_type;
   var sessionId = req.body.session_id;
   var payload = req.body.payload;
   var eventKey = req.body.event_key;
   const user = eventService.putById(id, eventName, eventType, sessionId, payload, eventKey);
   res.send(user);
};

const deleteBySessionId = (req, res, next) => {
   models.instance.Event.delete({sessionId:models.uuidFromString(req.params.sessionId)},(err) => {
      if(err){
          console.log(err);
          res.status(501).send({error: 'Internal server error'});
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
   deleteBySessionId
}

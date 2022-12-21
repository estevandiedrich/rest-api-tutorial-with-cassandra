const models = require('../services/cassandra-express.service');
const { Kafka, logLevel } = require("kafkajs");
const clientId = "my-app";
const brokers = ["localhost:9092"];
const topic = "message-log";
const kafka = new Kafka({ clientId, brokers, logLevel: logLevel.ERROR });
const producer = kafka.producer({
	// transactionalId: uuid, 
	retry:{retries: 2147483647},
	idempotence: true,
	maxInFlightRequests: 5
});
const consumer = kafka.consumer({
    groupId: clientId,
    minBytes: 5,
    maxBytes: 1e6,
    // wait for at most 3 seconds before receiving new data
    maxWaitTimeInMs: 3000
})

const getAll = async (res) => {
    let messages = [];
    await consumer.connect()
	await consumer.subscribe({ topic, fromBeginning: true })
	await consumer.run({
		autoCommit: true,
		autoCommitThreshold: 5,
		eachMessage: ({ message }) => {
            messages.push(message);
			console.log(`received message: ${message.value}`)
		},
	})
    res.status(200).body(messages);
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
    producer.send({
        topic,
        acks: -1,
        messages: [
            {
                key: event.sessionId,
                value: event,
            },
        ],
    })
    res.status(200).send('Event saved');
    console.log('Event saved');
};


module.exports = {
    getAll,
    getBySessionId,
    post,
    // putById,
    deleteBySessionId
}

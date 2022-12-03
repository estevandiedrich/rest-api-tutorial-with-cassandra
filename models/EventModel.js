module.exports = {
    fields: {
        eventName: "text",
        createdAt: "timestamp",
        eventKey: "text",
        eventType: "text",
        payload: "text",
        sessionId: {
            type: "uuid",
            default: { "$db_function": "uuid()" }
        }
    },
    key: ["sessionId", "createdAt"],
    table_name: "event",
    clustering_order: {"createdAt": "desc"}
}
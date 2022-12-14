const request = require("supertest");
const crypto = require('crypto');
const baseURL = "http://localhost:3600";

describe("GET /events", () => {
    let quantityBeforePost = 0;
    const newEvent = {
        sessionId: crypto.randomUUID(),
        payload: "{\"select plan\": \"basic plan 4\"}",
        eventType: "RT",
        eventKey: "Test event key",
        eventName: "SELECT_PLAN"
    }
    beforeAll(async () => {
        quantityBeforePost = (await request(baseURL).get("/events")).body.length;
        // set up the event
        await request(baseURL).post("/events").send(newEvent);
    })
    afterAll(async () => {
        await request(baseURL).delete(`/events/${newEvent.sessionId}`)
    })
    it("should return 200", async () => {
        const response = await request(baseURL).get("/events");
        expect(response.statusCode).toBe(200);
    });
    it("should return events", async () => {
        const response = await request(baseURL).get("/events");
        expect(response.body.length == quantityBeforePost + 1).toBe(true);
    });
    it("should return added event", async () => {
        const response = await request(baseURL).get(`/events/${newEvent.sessionId}`);
        expect(response.statusCode).toBe(200);
        const addedEvent = response.body[0];
        expect(addedEvent.sessionId).toBe(newEvent["sessionId"]);
        expect(addedEvent.payload).toBe(newEvent["payload"]);
        expect(addedEvent.eventType).toBe(newEvent["eventType"]);
        expect(addedEvent.eventKey).toBe(newEvent["eventKey"]);
        expect(addedEvent.eventName).toBe(newEvent["eventName"]);
    });
});

describe("POST /events", () => {
    const newEvent = {
        sessionId: crypto.randomUUID(),
        payload: "{\"select plan\": \"basic plan 4\"}",
        eventType: "RT",
        eventKey: "Test event key",
        eventName: "SELECT_PLAN"
    }
    afterAll(async () => {
        await request(baseURL).delete(`/events/${newEvent.sessionId}`)
    })
    it("should add an item to events array", async () => {
        const response = await request(baseURL).post("/events").send(newEvent);
        const addedEvent = response.body.event;
        expect(response.statusCode).toBe(201);
        expect(addedEvent.sessionId).toBe(newEvent["sessionId"]);
        expect(addedEvent.payload).toBe(newEvent["payload"]);
        expect(addedEvent.eventType).toBe(newEvent["eventType"]);
        expect(addedEvent.eventKey).toBe(newEvent["eventKey"]);
        expect(addedEvent.eventName).toBe(newEvent["eventName"]);
    });
});

// describe("Update one event", () => {
//     const newEvent = {
//         sessionId: crypto.randomUUID(),
//         payload: "{\"select plan\": \"basic plan 4\"}",
//         eventType: "RT",
//         eventKey: "Test event key",
//         eventName: "SELECT_PLAN"
//     }
//     beforeAll(async () => {
//         await request(baseURL).post("/events").send(newEvent);
//     })
//     afterAll(async () => {
//         await request(baseURL).delete(`/events/${newEvent.sessionId}`)
//     })
//     it("should update event if it exists", async () => {
//         const response = await request(baseURL).put(`/events/${newEvent.sessionId}`).send({
//             eventKey: "Updated test event key",
//         });
//         expect(response.statusCode).toBe(201);
//         expect(response.body.data.completed).toBe(true);
//     });
// });

describe("Delete one event", () => {
    const newEvent = {
        sessionId: crypto.randomUUID(),
        payload: "{\"select plan\": \"basic plan 4\"}",
        eventType: "RT",
        eventKey: "Test event key",
        eventName: "SELECT_PLAN"
    }
    beforeAll(async () => {
        const postResponse = await request(baseURL).post("/events").send(newEvent);
        expect(postResponse.statusCode).toBe(201);
    })
    it("should delete one event", async () => {
        const deleteResponse = await request(baseURL).delete(`/events/${newEvent.sessionId}`);
        expect(deleteResponse.statusCode).toBe(200);
        const getResponse = await request(baseURL).get(`/events/${newEvent.sessionId}`);
        expect(getResponse.statusCode).toBe(404);
    });
});
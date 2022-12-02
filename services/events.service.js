const models = require('../services/cassandra-express.service');

const getAll = (count) => {
    var data = {
        "error": 1,
        "events": ""
    };
    var select = "SELECT * FROM event";
    if (count) {
        var select = select.concat(` LIMIT ${count}`);
    }
    return new Promise((resolve, reject) => {
        connection.execute(select, function (err, rows) {
            if (rows.rowLength != 0) {
                data["error"] = 0;
                data["events"] = rows.rows;
            } else {
                data["events"] = 'No events found';
            }
            resolve(data);
        })
    });
}

const getById = (id) => {
    var data = {
        "error": 1,
        "events": ""
    };
    var params = [id];
    var select = "SELECT * from event WHERE id= ?;"
    return new Promise((resolve, reject) => {
        connection.execute(select, params, { prepare: true }, function (err, rows) {
                console.log(err);
            if (rows.rowLength != 0) {
                data["error"] = 0;
                data["events"] = rows.rows;
                console.log(rows.rows);
            } else {
                data["events"] = 'No event found';
            }
            resolve(data);
        });
    })
};

const post = (id, eventName, eventType, sessionId, payload, eventKey) => {
    var data = {
        "error": 1,
        "events": ""
    };

    if (!!id && !!eventName && !!eventType && !!sessionId && !!payload && !!eventKey) {
        const createdAt = Date.now();
        var insert = "INSERT INTO event(id, event_name, event_type, created_at, session_id, payload, event_key) VALUES (?, ?, ?, ?, ?, ?, ?);";
        var params = [id, eventName, eventType, createdAt, sessionId, payload, eventKey];
        return new Promise((resolve, reject) => {
            connection.execute(insert, params, { prepare: true }, function (err) {
                if (!!err) {
                    data["events"] = "Error adding data";
                    console.log(err);
                } else {
                    data["error"] = 0;
                    data["events"] = "Event added successfully";
                }
                resolve(data);
            });
        });
    } else {
        data["events"] = "Please provide all required data (i.e : id, eventName, eventType, sessionId, payload, eventKey)";
        return data;
    }
}

const putById = (id, eventName, eventType, sessionId, payload, eventKey) => {
    var data = {
        "error": 1,
        "events": ""
    };
    if (!!id && !!eventName && !!eventType && !!sessionId && !!payload && !!eventKey) {
        var update = "UPDATE event SET event_name=?, event_type=?, session_id=?, payload=?, event_key=? WHERE id=?"
        var params = [eventName, eventType, sessionId, payload, eventKey, id]
        return new Promise((resolve, reject) => {
            connection.execute(update, params, { prepare: true }, function (err) {
                console.log(err);
                if (!!err) {
                    data["events"] = "Error Updating data";
                } else {
                    data["events"] = 0;
                    data["events"] = "Event updated successfully";
                }
                resolve(data);
            });
        });
    } else {
        data["events"] = "Please provide all required data (i.e : id, eventName, eventType, sessionId, payload, eventKey)";
        return data;
    }
};

const deleteById = (id) => {
    var data = {
        "error": 1,
        "events": ""
    };
    if (!!id) {
        var del = "DELETE FROM event WHERE id=?";
        var params = [id]
        return new Promise((resolve, reject) => {
            connection.execute(del, params, { prepare: true }, function (err) {
                if (!!err) {
                    data["events"] = "Error deleting data";
                } else {
                    data["error"] = 0;
                    data["events"] = "Event deleted successfully";
                }
                resolve(data);
            });
        });
    } else {
        data["events"] = "Please provide all required data (i.e : id )";
        return data;
    }
};

module.exports = {
    getAll,
    getById,
    post,
    putById,
    deleteById
}
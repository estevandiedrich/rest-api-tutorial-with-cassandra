const logger = require('../logger');

module.exports = (err, req, res, next) => {
    console.error(err);
    logger.error(err.message, err);
    res.status(500).send({ error: err.message });
}
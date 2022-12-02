var cassandra 		= require("cassandra-driver");
////////////////////////////////////
// Cassandra database config
////////////////////////////////////
var dbConfig = {
	 	contactPoints : ['127.0.0.1'],
	 	keyspace:'test'
	};

var connection = new cassandra.Client(dbConfig);

connection.connect(function (err, result) {
    console.log('cassandra connected');
});

module.exports = connection;
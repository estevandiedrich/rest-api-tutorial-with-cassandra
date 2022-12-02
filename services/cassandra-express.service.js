var models = require('express-cassandra');

//Tell express-cassandra to use the models-directory, and
//use bind() to load the models using cassandra configurations.
console.log(__dirname);
models.setDirectory( __dirname + '/../models').bind(
    {
        clientOptions: {
            contactPoints: ['127.0.0.1'],
            localDataCenter: 'datacenter1',
            protocolOptions: { port: 9042 },
            keyspace: 'mykeyspace',
            queryOptions: {consistency: models.consistencies.one},
            socketOptions: { readTimeout: 60000 },
            authProvider: new models.driver.auth.PlainTextAuthProvider('cassandra', 'cassandra')
        },
        ormOptions: {
            defaultReplicationStrategy : {
                class: 'SimpleStrategy',
                replication_factor: 1
            },
            migration: 'alter',
            createKeyspace: true
        }
    },
    function(err) {
        if(err) throw err;

        // You'll now have a `person` table in cassandra created against the model
        // schema you've defined earlier and you can now access the model instance
        // in `models.instance.Person` object containing supported orm operations.
    }
);

module.exports =  models;
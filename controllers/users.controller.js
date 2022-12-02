const models = require('../services/cassandra-express.service');
const crypto = require('crypto');


exports.insert = (req, res) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    let password = salt + "$" + hash;
    let permissionLevel = 1;
    let uuid = models.uuid();
    let person = new models.instance.Person({
        id: uuid,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: password,
        permissionLevel: permissionLevel,
        created: Date.now()
    });
    person.save((err) => {
        if(err) {
            console.log(err);
            res.status(501).send({error: 'Internal server error'});
            return;
        }
        res.status(201).send({uuid: uuid});
        console.log('person saved!');
    });
};

exports.list = (req, res) => {
    models.instance.Person.find({$limit:10},(err,list) => {
        if(err){
            console.log(err);
            res.status(501).send({error: 'Internal server error'});
            return;
        }
        res.status(200).send(list);
        console.log('person list!');
    });
};

exports.getById = (req, res) => {
    models.instance.Person.find({id:models.uuidFromString(req.params.userId)},(err,list) => {
        if(err){
            console.log(err);
            res.status(501).send({error: 'Internal server error'});
            return;
        }
        res.status(200).send(list);
        console.log('person list!');
    });
};
exports.patchById = (req, res) => {
    models.instance.Person.update({id:models.uuidFromString(req.params.userId)},req.body,(err) => {
        if(err){
            console.log(err);
            res.status(501).send({error: 'Internal server error'});
            return;
        }
        res.status(201).send({uuid:req.params.userId});
        console.log('person updated!');
    });
};

exports.removeById = (req, res) => {
    models.instance.Person.delete({id:models.uuidFromString(req.params.userId)},(err) => {
        if(err){
            console.log(err);
            res.status(501).send({error: 'Internal server error'});
            return;
        }
        res.status(200).send({uuid:req.params.userId});
        console.log('person deleted!');
    });
};
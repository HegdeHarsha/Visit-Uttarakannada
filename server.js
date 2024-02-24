const express = require('express');
const {MongoClient} = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// connect to mongodb
MongoClient.connect('mongodb://localhost:27017/', (err, db) => {
    console.log('connected to mongodb');
})

// post new user
app.post('/auth', (req, res) => {
    const user = req.body;
    MongoClient.connect('mongodb://localhost:27017/', (err, client) => {
        var db = client.db('test');
        db.collection('users').insertOne(user, (err, result) => {
            if (err) {
                res.sendStatus(500);
            } else {
                console.log('inserted user ' + JSON.stringify(user));
                res.send(result);
            }
        });
    })
})

// run the server
app.listen(5000, () => {
    console.log('server running on port 5000');
})
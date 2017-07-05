require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const date = require('date-and-time');

var {mongoose} = require('./db/mongoose');
var {Survey} = require('./models/survey');
var {Room} = require('./models/room');
var {City} = require('./models/city');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

// The headers must be sent to allow Cross Origin Resource Sharing
// Requests to connect will be denied without this
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, x-auth');
    res.setHeader('Access-Control-Expose-Headers', 'x-auth');
    next();
});



// Put data into mongoDB
app.put('/rooms', (req, res) => {

    Room.findOne({roomID: req.body.roomID}, function (err, room) {
        
        var split = req.body.date.split(' ')[0].split('-');
        var date = split[0]+'/'+split[1]+'/'+split[2];

        if (err)
            res.send(err)

        if (room) 
        {     
            var h = room.history.push({
                'price': req.body.price, 
                'satisfaction': req.body.satisfaction, 
                'reviews': req.body.reviews, 
                'date' : date
            });
            req.body.history = room.history;

            Room.update({roomID: req.body.roomID}, req.body).then((doc) => {
                res.send(doc);
            }, (e) => {
                res.status(400).send(e);
            })
        } 
        else
        {
            var history= [];
            var h = history.push({
                'price': req.body.price, 
                'satisfaction': req.body.satisfaction, 
                'reviews': req.body.reviews, 
                'date' : date
            });

            var room = new Room ({
                roomID: req.body.roomID,
                hostID: req.body.hostID,
                roomType: req.body.roomType,
                neighborhood: req.body.neighborhood,
                reviews: req.body.reviews,
                satisfaction: req.body.satisfaction,
                accommodates: req.body.accommodates,
                bedrooms: req.body.bedrooms,
                price: req.body.price,
                minstay: req.body.minstay,
                longitude: req.body.longitude,
                latitude: req.body.latitude,
                date: date,
                city: req.body.city,
                history: history
            })  
            room.save().then((doc) => {
                res.send(doc);
            }, (e) => {
                res.status(400).send(e);
            });
        }

    });    
})

app.post('/rooms/filter', (req, res) => {
    var filterParams = {};
    var neighborhood = req.body.neighborhood;
    var city = req.body.city;

    if (neighborhood) {
      _.merge(filterParams, {neighborhood: neighborhood});
    }
    if (city) {
      _.merge(filterParams, {city: city});
    }
    console.log(filterParams)
    Room.find(filterParams).then((room) => {
      res.send(room);
    }, (e) => {
      res.status(400).send(e);
    });
});

app.get('/rooms', (req, res) => {
    console.log("rooms call");
    Room.find().then((room) => {
        res.send(room);
    }, (e) => {
        res.status(400).send(e);
    });
});


// Put data into mongoDB
app.put('/city', (req, res) => {

    Room.findOne({name: req.body.name}, function (err, city) {

        if (err)
            res.send(err)

        if (city) 
        {     
            City.update({name: req.body.name}, req.body).then((doc) => {
                res.send(doc);
            }, (e) => {
                res.status(400).send(e);
            })
        } 
        else
        {
            var city = new City ({
                name: req.body.name,
                neighborhood: req.body.neighborhood
            })  
            city.save().then((doc) => {
                res.send(doc);
            }, (e) => {
                res.status(400).send(e);
            });
        }

    });    
})

app.get('/city', (req, res) => {
    console.log("city call");
    City.find().then((city) => {
        res.send(city);
    }, (e) => {
        res.status(400).send(e);
    });
});


// Put data into mongoDB
app.put('/surveys', (req, res) => {

    Survey.findOne({ID: req.body.ID}, function (err, survey) {
        
        if (err)
            res.send(err)

        if (survey) 
        {             
            survey.update({ID: req.body.ID}, req.body).then((doc) => {
                res.send(doc);
            }, (e) => {
                res.status(400).send(e);
            })
        } 
        else
        {
            var survey = new Survey ({
                ID: req.body.ID,
                Question: req.body.Question,
                Choices: req.body.Choices,
                Section: req.body.Section,
                Type: req.body.Type,
                Answer: req.body.Answer,
                Note: req.body.Note,
                ChoicesNote: req.body.ChoicesNote,
            })  

            survey.save().then((doc) => {
                res.send(doc);
            }, (e) => {
                res.status(400).send(e);
            });
        }

    });    
})

// Get total surveys from MongoDB
app.get('/surveys', (req, res) => {
    Survey.find().then((survey) => {
        res.send(survey);
    }, (e) => {
        res.status(400).send(e);
    });
});



app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});

module.exports = {app};

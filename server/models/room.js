var mongoose = require('mongoose');

var Room = mongoose.model('Room', {
  roomID: {
    type:String
  },
  hostID: {
    type: String
  },
  roomType: {
    type: String
  },
  neighborhood: {
    type: String
  },
  reviews: {
    type: String
  },
  satisfaction: {
    type: String
  },
  accommodates: {
    type: String
  },
  bedrooms: {
    type: String
  },
  price:{
    type: String
  },
  minstay: {
    type: String
  },
  longitude: {
    type: String
  },
  latitude: {
    type: String
  },
  date: {
    type: String
  },
  city: {
    type: String
  },
  history: [{
    price: String,
    satisfaction: String,
    reviews: String,
    date: String
  }]

});



module.exports = { Room };


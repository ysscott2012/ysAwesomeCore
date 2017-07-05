var mongoose = require('mongoose');

var City = mongoose.model('City', {
  name: {
    type:String
  },
  neighborhood: [{
    name: String
  }]

});
module.exports = { City };


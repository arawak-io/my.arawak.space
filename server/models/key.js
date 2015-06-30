var mongoose = require('mongoose');

//define the schema for our apps model
var Schema = mongoose.Schema;

var keySchema = new Schema({
  name   : String,
  publickey   : String,
  user   : String
});

// create the model for apps and expose it to our app
module.exports = mongoose.model('Key', keySchema);

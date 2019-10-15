var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccountSchema = new Schema({
  username: String,
  password:   String,
});

var accountModel = mongoose.model('accounts', AccountSchema );

module.exports  = accountModel;
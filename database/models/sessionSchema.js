const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema({
  email: String,
});

const Session = mongoose.model('Session', sessionSchema);

module.exports.Session = Session;

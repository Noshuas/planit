const session = require('express-session');
const cookie = require('cookie-parser');
// const { v4: uuidv4 } = require('uuid');

// const sessions = {};

const sessionParser = session({
  secret: 'ivanswrld',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 600000,
  },
});

const cookieParser = cookie('ivanswrld');

const sessionManager = (req, res, next) => {
  const { user } = req;
  res.cookie('logged-in', req.isAuthenticated());

  if (user) {
    const { email, name } = user;
    res.cookie('name', name);
    res.cookie('email', email);
  }

  next();
};

module.exports.sessionParser = sessionParser;
module.exports.cookieParser = cookieParser;
module.exports.sessionManager = sessionManager;

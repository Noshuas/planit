const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { fetchUser } = require('../../database/controllers/userController.js');
// const { deleteSession, addSession } = require('../../database/controllers/sessionController.js')
// const { Session } = require('../../database/models/sessionSchema');
const { User } = require('../../database/models/userSchema');

// const loginRequired = (req, res, next) => {
//   if (req.user) {
//     next();
//   } else {
//     res.render('/login');
//   }
// };

passport.use('local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  function(email, password, done) {
    fetchUser({property: 'email', value: email})
      .then((mongoResult) => {
        const user = mongoResult[0];
        if (!user) {
          return done(null, false, {message: "Unable to find email. Please check spelling, or sign up."});
        } else {
          if (user.password !== password) {
            return done(null, false, {message: "Password incorrect for " + email});
          } else {
            return done(null, user);
          }
        }
      })
      .catch((error) => {
        console.error(error);
        return done(error);
      });
  }
));

passport.serializeUser(function(user, done) {
  const { id, email } = user;
  console.log('serialize', id, typeof id);
  done(null, id);
});

passport.deserializeUser(function(id, done) {
  console.log('deserialize', id);
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = passport;
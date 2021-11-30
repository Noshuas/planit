const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { fetchUser } = require('../../database/controllers/userController');
// const { deleteSession, addSession } = require('../../database/controllers/sessionController')
// const { Session } = require('../../database/models/sessionSchema');
const { User } = require('../../database/models/userSchema');

// const loginRequired = (req, res, next) => {
//   if (req.user) {
//     next();
//   } else {
//     res.render('/login');
//   }
// };

passport.use('local', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  ((email, password, done) => {
    fetchUser({ property: 'email', value: email })
      .then((mongoResult) => {
        const user = mongoResult[0];
        if (!user) {
          return done(null, false, { message: 'Unable to find email. Please check spelling, or sign up.' });
        }
        if (user.password !== password) {
          return done(null, false, { message: `Password incorrect for ${email}` });
        }
        return done(null, user);
      })
      .catch((error) => {
        console.error(error);
        return done(error);
      });
  }),
));

passport.serializeUser(({ id }, done) => {
  console.log('serialize', id, typeof id);
  done(null, id);
});

passport.deserializeUser((id, done) => {
  console.log('deserialize', id);
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;

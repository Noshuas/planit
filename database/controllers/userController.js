const { User } = require('../models/userSchema');

// Takes in an options object that allows you to specify
// what propert and what value you want to search by
/**
 * example:
 * {
 *    property: '_id',
 *    value: '60ecd6fe850cd99c5c552ce4'
 * }
 */
const fetchUser = ({ property, value }) => new Promise((resolve) => {
  User.find({}).where(property).equals(value)
    .then((response) => {
      resolve(response);
    })
    .catch((err) => {
      console.error(err);
    });
});

const addUser = (user) => new Promise((resolve) => {
  User.create(user)
    .then((response) => {
      resolve(response);
    }).catch((err) => {
      console.error(err);
    });
});

const deleteUser = (email) => new Promise((resolve) => {
  User.deleteOne({}).where('email').equals(email)
    .then((res) => {
      resolve(res);
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = {
  fetchUser,
  addUser,
  deleteUser,
};

const { Session } = require('../models/sessionSchema');

// const fetchSession = (email) => {
//   return new Promise((resolve, reject) => {
//     Session.find({}).where('email').equals(email)
//     .then((res) => {
//       resolve(res);
//     }).catch((err) => {
//       console.error(err);
//       reject(err);
//     })
//   })
// }

// const fetchSession = async (email) => {
//   try {
//     let data = await Session.find({}).where('email').equals(email);
//     return data.length > 0 ? 'No Session Found' : data;
//   } catch(err) {
//     console.error(err);
//     throw err;
//   }
// };

// const addSession = (session) => {
//   return new Promise((resolve, reject) => {
//     Session.create(session)
//     .then((res) => {
//       resolve(res);
//     }).catch((err) => {
//       console.error(err);
//       reject(err);
//     })
//   })
// }

// const deleteSession = (email) => {
//   return new Promise((resolve, reject) => {
//     Session.deleteOne({}).where('email').equals(email)
//     .then((res) => {
//       resolve(res);
//     }).catch((err) => {
//       console.error(err);
//       reject(err);
//     })
//   })
// }

const deleteAllSessions = async () => new Promise((resolve) => {
  Session.deleteMany({})
    .then((response) => {
      resolve(response);
    }).catch((err) => {
      console.error(err);
    });
});

module.exports = {
  // fetchSession,
  // addSession,
  // deleteSession,
  deleteAllSessions,
};

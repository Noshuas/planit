require('./index');
const { addEvent, deleteAllEvents } = require('./controllers/eventController');
const { addUser, fetchUser, deleteUser } = require('./controllers/userController');
const { deleteAllSessions } = require('./controllers/sessionController');
const { mockEvent1, mockEvent2 /* mockEvent3 */ } = require('../MockData/EventData');

const mockUser = {
  name: 'Tarrin',
  email: 'tarrinneal@gmail.com',
  events: [],
  password: 'bargle',
};

// const mockSession = {
//   session_id: '1',
//   user: '60ec9ccf28c54f891c97b28d'
// }

// const updateArr = [
//   // {
//   //   where: {
//   //     property: 'owner',
//   //     value: 'Tarrin'
//   //   },
//   //   what: {
//   //     method: '$set', // <-- go to mongodb update methods for more options
//   //     field: 'name',
//   //     value: 'Testing'
//   //   },
//   // },
//   {
//     where: {
//       property: 'owner',
//       value: 'Tarrin'
//     },
//     what: {
//       method: '$push',
//       field: 'rsvps',
//       value: {
//         name: 'Tommy',
//         availability: [
//           {
//             start: 'sometime',
//             end: 'sometime'
//           }
//         ],
//       }
//     },
//   }
// ];
// let option = { // <--- this is the options for a get request.
//   count: 1,
//   where: {
//     property: '_id',
//     value: 'j432h1ju4h3k2'
//   }
// }

// create mongodb names "planit"

const seed = async () => {
  try {
    await deleteAllEvents();
    console.log('Events Deleted');

    await deleteAllSessions();
    console.log('Sessions Deleted');

    await deleteUser('tarrinneal@gmail.com');
    console.log('User deleted');

    await addUser(mockUser);
    console.log('User added successfully');

    await fetchUser({ property: 'email', value: 'tarrinneal@gmail.com' });
    await addEvent(mockEvent1, 'tarrinneal@gmail.com');
    await addEvent(mockEvent2, 'jacobsantala@email.com');
  } catch (err) {
    console.error('Seed Failed', err);
  } finally {
    console.info('Seeded db successfully. Gracefully exiting.');
    process.exit(0);
  }
};
seed();

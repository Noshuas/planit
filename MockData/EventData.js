const mockEvent1 = {
  name: 'Tarvent',
  description: 'Hey everybody come to my event, it\'s going to be lit!',
  owner: 'Tarrin',
  owner_email: 'tarrinneal@gmail.com',
  photo_url: 'https://res.cloudinary.com/du60eiu3e/image/upload/v1626405959/ekt4pgyc1swdf5kydbzx.jpg',
  location: 'Tarrin\'s house',
  duration: 7200,
  status: 'pending',
  time: null,
  window: {
    start: '2021-07-10T22:30:00.002Z',
    end: '2021-07-17T22:30:00.002Z',
  },
  rsvps: [
    {
      name: 'Philbert',
      email: 'philly@coolguy.com',
      availability: [
        {
          start: '2021-07-10T22:30:00.002Z',
          end: '2021-07-11T00:30:00.002Z',
        },
        {
          start: '2021-07-10T02:00:00.002Z',
          end: '2021-07-10T04:00:00.002Z',
        },
        {
          start: '2021-07-10T21:00:00.002Z',
          end: '2021-07-11T02:30:00.002Z',
        },
        {
          start: '2021-07-12T04:00:00.002Z',
          end: '2021-07-12T10:00:00.002Z',
        },
        {
          start: '2021-07-15T06:30:00.002Z',
          end: '2021-07-15T10:30:00.002Z',
        },
        {
          start: '2021-07-16T10:00:00.002Z',
          end: '2021-07-16T12:00:00.002Z',
        },
      ],
    },
    {
      name: 'Shrek',
      eamil: 'GetOutOf@my.swamp',
      availability: [
        {
          start: '2021-07-10T23:00:00.002Z',
          end: '2021-07-11T02:00:00.002Z',
        },
        {
          start: '2021-07-10T03:00:00.002Z',
          end: '2021-07-10T06:00:00.002Z',
        },
        {
          start: '2021-07-12T04:30:00.002Z',
          end: '2021-07-12T10:00:00.002Z',
        },
        {
          start: '2021-07-14T04:00:00.002Z',
          end: '2021-07-15T10:30:00.002Z',
        },
        {
          start: '2021-07-16T08:00:00.002Z',
          end: '2021-07-16T10:30:00.002Z',
        },
      ],
    },
  ],
};

const mockEvent2 = {
  name: 'Smoked Meat Appreciation',
  description: 'Hey everybody come to my event, It\'s going to be smokin',
  owner: 'Tarrin',
  owner_email: 'jacobsantala@email.com',
  photo_url: 'https://res.cloudinary.com/du60eiu3e/image/upload/v1625849949/sl6taxqhxovgsgufiqlj.jpg',
  location: 'My Place',
  duration: 7200,
  status: 'Confirmed',
  time: '2021-07-17T22:30:00.002Z',
  window: {
    start: '2021-07-10T22:30:00.002Z',
    end: '2021-07-17T22:30:00.002Z',
  },
  rsvps: [
    {
      name: 'Johnny Cash',
      email: 'Johnny@coolguy.com',
      availability: [
        {
          start: '2021-07-10T22:30:00.002Z',
          end: '2021-07-11T00:30:00.002Z',
        },
        {
          start: '2021-07-10T02:00:00.002Z',
          end: '2021-07-10T04:00:00.002Z',
        },
        {
          start: '2021-07-10T21:00:00.002Z',
          end: '2021-07-11T02:30:00.002Z',
        },
        {
          start: '2021-07-12T04:00:00.002Z',
          end: '2021-07-12T10:00:00.002Z',
        },
        {
          start: '2021-07-15T06:30:00.002Z',
          end: '2021-07-15T10:30:00.002Z',
        },
        {
          start: '2021-07-16T10:00:00.002Z',
          end: '2021-07-16T12:00:00.002Z',
        },
      ],
    },
    {
      name: 'Shrek',
      eamil: 'GetOutOf@my.swamp',
      availability: [
        {
          start: '2021-07-10T23:00:00.002Z',
          end: '2021-07-11T02:00:00.002Z',
        },
        {
          start: '2021-07-10T03:00:00.002Z',
          end: '2021-07-10T06:00:00.002Z',
        },
        {
          start: '2021-07-12T04:30:00.002Z',
          end: '2021-07-12T10:00:00.002Z',
        },
        {
          start: '2021-07-14T04:00:00.002Z',
          end: '2021-07-15T10:30:00.002Z',
        },
        {
          start: '2021-07-16T08:00:00.002Z',
          end: '2021-07-16T10:30:00.002Z',
        },
      ],
    },
  ],
};

module.exports = {
  mockEvent1,
  mockEvent2,
};

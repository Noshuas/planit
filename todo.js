/**
   *  Tasks:
   *  - change frameStart and End to timeFrame: [start, end]
   *  - Need to add hours to the event on creation as hours
   *  - Need to change the name field on event info to be title
   *  - Create an event context and pass it down WIP
   *  - Handle when the photo upload
   *      -try to reuse the logic from create-event page
   *  - Create a method for updating the DB with new photo url
   *      -try to reuse the same logic from create-event
   *  - Need to change fields on the event doc
   *  - Times should be initialized as so: Date.now()
   *  - we need to ensure that multiple people who've rsvpd
   *    can update time without adding new rsvp.
   *  - Need to implement node mailer
   *  - Try to implement Event-Page with pieces from create-event page
   *  - Create a Layout for the main content of the Create and Edit page
   *
   *
   *  - Use stack and grid for layout
   *
   *
   *
   *
   *
   *
   *
   *
   *
   * {
    _id: '61b12a993d068aac2de050bf',
    owner: {
      name: 'Noshua Setzer',
      email: 'noshuas@gmail.com',
      image: 'https://lh3.googleusercontent.com/a/AATXAJzDE-Y2ww4JKqrnjCv6jucwHiV9VEagSGxZJyaZ5g=s96-c'
    },
    info: {
      title: 'The "format the event" event...',
      description: "I should probably provide something nice and bouncy here. There isn't likely to ever be anyone to actually fill out this entire text field, so we'll just have to do our best. \n" +
        '\n' +
        'I hope that this makes working with this data easy, and is quite pretty as well.',
      location: 'my computer screen',
      imageUrl: 'https://res.cloudinary.com/du60eiu3e/image/upload//c_fill,g_auto,h_150,w_1050/v1638853884/mpmusb4ngsvozaxcwmqs.jpg',
      time: {
         duration, scheduled, timeFrame: [start, end], created
      }
    },
    attendees: [
       {
          email,
          conflicts: [{
             start, end
          }...]
       }
    ]
  }
   *
   *
   *
   *
   *
   *
   *
   *
   */
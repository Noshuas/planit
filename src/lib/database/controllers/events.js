export const fetchEvents = ( query, cb ) => {
  global._mongoClientPromise.then((client) => {
    let db = client.db();
    let events = db.collection('events');
    events.find(query).toArray()
      .then((result)=>{ cb(null, result) })
      .catch(cb);
  });
}

export const postEvent = ( query, cb ) => {
  global._mongoClientPromise.then((client) => {
    let db = client.db();
    let events = db.collection('events');
    events.insertOne(query)
      .then((result)=>{ cb(null, result) })
      .catch(cb);
  });
}

export const timeStamp = (body) => {
  console.log(body);
  const {
    name, duration, location, description, window,
    owner, status, time, photo_url, attendees
  } = body

  return {
    owner,
    event: {
      name,
      status,
      description,
      location,
      image: photo_url,
      time: {
        createdAt: + new Date(),
        time,
        duration,
        window,
      },
    },
    attendees: []
  }
}
export const fetchEvents = (query, cb = () => { }) => {
  console.log(query);
  return global._mongoClientPromise.then((client) => {
    let db = client.db();
    let events = db.collection('events');
    return events.find(query)
      .toArray()
      .then((result) => {
        result.forEach((doc) => {
          doc._id = doc._id.toString();
        })
        console.log('inside db:', result)
        cb(null, result)
        return result
      })
      .catch(cb);
  });
}

export const postEvent = (query, cb) => {
  return global._mongoClientPromise.then((client) => {
    let db = client.db();
    let events = db.collection('events');
    return events.insertOne(query)
      .then((result) => {
        cb(null, result)
        return result;
      })
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
    info: {
      name,
      status,
      description,
      location,
      image: photo_url,
      time: {
        created: + Date.now(),
        scheduled: time,
        duration,
        frameStart: window.start,
        frameEnd: window.end,
      },
    },
    attendees: []
  }
}
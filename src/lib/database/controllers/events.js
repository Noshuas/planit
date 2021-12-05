export const fetchEvents = ( query, cb ) => {
  global._mongoClientPromise.then((client) => {
    let db = client.db();
    let events = db.collection('events');
    events.find(query).toArray()
      .then((result)=>{ cb(null, result) })
      .catch(cb);
  });
}


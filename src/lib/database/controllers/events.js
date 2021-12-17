import _mongoClientPromise from '../mongodb'

export const fetchEvents = (query) => _mongoClientPromise
  .then((client) => {
    const db = client.db();
    const events = db.collection('events');
    return events.find(query)
      .toArray()
      .then((result) => {
        result.forEach((doc) => {
          doc._id = doc._id.toString();
        });
        return result;
      });
  });

export const postEvent = (query) => _mongoClientPromise
  .then((client) => {
    const db = client.db();
    const events = db.collection('events');
    return events.insertOne(query);
  });

export const updateEvent = (filter, updateDocument, insertingConflicts) => _mongoClientPromise
  .then((client) => {
    const db = client.db();
    const events = db.collection('events');
    if (insertingConflicts)
      return Promise.all([
        events.updateOne(filter, updateDocument.pull),
        events.updateOne(filter, updateDocument.push)
      ])
    return events.updateOne(filter, updateDocument)
  });

export const deleteEvent = (query) => _mongoClientPromise
.then((client) => {
  const db = client.db();
  const events = db.collection('events');
  return events.deleteOne(query);
});
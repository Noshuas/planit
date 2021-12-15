import { Options } from 'devextreme-react/color-box';

export const fetchEvents = (query) => global._mongoClientPromise
  .then((client) => {
    const db = client.db();
    const events = db.collection('events');
    return events.find(query)
      .toArray()
      .then((result) => {
        result.forEach((doc) => {
          doc._id = doc._id.toString();
        });
        console.log('inside db:', result);
        return result;
      });
  });

export const postEvent = (query) => global._mongoClientPromise
  .then((client) => {
    const db = client.db();
    const events = db.collection('events');
    return events.insertOne(query);
  });

export const updateEvent = (filter, updateDocument, options) => global._mongoClientPromise
  .then((client) => {
    const db = client.db();
    const events = db.collection('events');
    return events.updateOne(filter, updateDocument, options)
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log('err', err);
        return err;
      });
  });

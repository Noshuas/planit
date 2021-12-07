import { fetchEvents, postEvent, timeStamp } from 'lib/database/controllers';

export default async function handler(req, res) {
  return new Promise((resolve, reject) => {

    console.log(req.method);
    if (req.method === 'POST') {
      let event = timeStamp(req.body);
      postEvent(event, (err, result) => {
        (err)
          ? res.status(500).send(err)
          : res.status(200).send(result);
        resolve()
      })

    } else if (req.method === 'GET') {
      const query = {'owner.email': req.query.email}
      fetchEvents(query, (err, result) => {
        (err)
          ? res.status(500).send(err)
          : res.status(200).send(result);
        resolve()
      })
    }
  })
}
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
      const [name, email] = req.query.user
      const dbQ = { owner: {name, email}}
      console.log(dbQ);
      fetchEvents(dbQ, (err, result) => {
        (err)
          ? res.status(500).send(err)
          : res.status(200).send(result);
        resolve()
      })
    }
  })
}
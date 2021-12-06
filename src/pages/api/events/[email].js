import { fetchEvents } from 'lib/database/controllers';

export default async function handler(req, res) {
  return new Promise((resolve, reject) => {

    console.log(req.method);
    if (req.method === 'POST') {
      console.log(req.body, req.params);
      res.status(200).send('eyyyyy');
      resolve()


    } else if (req.method === 'GET') {
      fetchEvents(req.query, (err, result) => {
        (err)
          ? res.status(500).send(err)
          : res.status(200).send(result);
        resolve()
      })
    }
  })
}
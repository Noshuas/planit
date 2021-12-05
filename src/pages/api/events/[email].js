import { fetchEvents } from 'lib/database/controllers';

export default async function handler(req, res) {
  fetchEvents(req.query, (err, result) => {
    (err)
      ? res.status(500).send(err)
      : res.status(200).send(result);
  })
}
import {
  fetchEvents, postEvent, updateEvent, timeStamp,
} from 'lib/database/controllers';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    console.log(req.query);
    const query = { 'owner.email': req.query.email[0] };
    fetchEvents(query)
      .then((result) => res.status(200).send(result))
      .catch((err) => res.status(500).send(err));
  }

  if (req.method === 'POST') {
    postEvent(req.body)
      .then((result) => res.status(200).send(result))
      .catch((err) => res.status(500).send(err));
  }

  if (req.method === 'PATCH') {
    const { id, updateDocument, options } = req.body;
    updateEvent({ _id: ObjectId(id) }, updateDocument, options)
      .then((result) => res.status(200).send(result))
      .catch((err) => res.status(500).send(err));
  }
}

import {
  fetchEvents, postEvent, updateEvent
} from 'lib/database/controllers';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
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
    const { id, updateDocument, insertingConflicts } = req.body;
    updateEvent({ _id: ObjectId(id) }, updateDocument, insertingConflicts)
      .then((result) => res.status(200).send(result))
      .catch((err) => {
        console.log('here is the erreerere', err)
        res.status(500).send(err)
      });
  }
}

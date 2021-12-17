import {
  fetchEvents, postEvent, updateEvent
} from 'lib/database/controllers';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST' && req.body.email) {
    const query = { 'owner.email': req.body.email };
    fetchEvents(query)
      .then((result) => res.status(200).send(result))
      .catch((err) => res.status(500).send(err));
  }

  if (req.method === 'POST' && !req.body.email) {
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

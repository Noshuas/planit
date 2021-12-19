import {
  fetchEvents, postEvent, updateEvent
} from 'lib/database/controllers';
import { deleteEvent } from 'lib/database/controllers/events';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const query = { _id: ObjectId(req.query.id[0]) }
    return fetchEvents(query)
      .then((result) => res.status(200).send(result))
      .catch((err) => res.status(500).send(err));
  }

  if (req.method === 'POST' && req.body.email) {
    const query = { 'owner.email': req.body.email };
    return fetchEvents(query)
      .then((result) => res.status(200).send(result))
      .catch((err) => res.status(500).send(err));
  }

  if (req.method === 'POST' && !req.body.email) {
    return postEvent(req.body)
      .then((result) => res.status(200).send(result))
      .catch((err) => res.status(500).send(err));
  }

  if (req.method === 'PATCH') {
    const { id, updateDocument, insertingConflicts } = req.body;
    return updateEvent({ _id: ObjectId(id) }, updateDocument, insertingConflicts)
      .then((result) => res.status(200).send(result))
      .catch((err) => res.status(500).send(err));
  }

  if (req.method === 'DELETE') {
    return deleteEvent({ _id: ObjectId(req.body.id) })
      .then((result) => res.status(200).send(result))
      .catch((err) => res.status(500).send(err));
  }
}

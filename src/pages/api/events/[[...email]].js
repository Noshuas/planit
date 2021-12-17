import {
  fetchEvents, postEvent, updateEvent
} from 'lib/database/controllers';
import { deleteEvent } from 'lib/database/controllers/events';
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

  if (req.method === 'DELETE') {
    console.log('in the delete method', req.body, req.data)
    deleteEvent({_id: ObjectId(req.body.id)})
      .then((result) => {
        console.log(result, 'this is the result')
        res.status(200).send(result)
      })
      .catch((err) => {
        console.log(err, 'this is the error')
        res.status(500).send(err);
      })
  }
}

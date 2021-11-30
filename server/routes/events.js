const express = require('express');
const cloudinary = require('cloudinary').v2;
const { fetchEvents, addEvent, updateEvent } = require('../../database/controllers/eventController');

const eventRouter = express.Router();

require('dotenv').config();

eventRouter.get('/', async (req, res) => {
  let { options } = req.body.options === undefined
    ? req.query
    : req.body;

  options = typeof options === 'string'
    ? JSON.parse(options)
    : options;

  try {
    const eventData = await fetchEvents(options);
    res.status(200).send(eventData);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});

eventRouter.put('/', async (req, res) => {
  const { updates } = req.body; // Array of update objects
  try {
    await updateEvent(updates);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});

eventRouter.post('/', async ({ body }, res) => {
  try {
    await addEvent(body, 'tarrinneal@gmail.com');
    // res.send(response);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});

eventRouter.post('/photos', (req, res) => {
  const { 0: fileData } = req.files;
  const confObj = {
    cloud_name: `${process.env.CLOUD_NAME}`,
    api_key: `${process.env.API_KEY}`,
    api_secret: `${process.env.API_SECRET}`,
  };
  cloudinary.config(confObj);

  cloudinary.uploader.upload(fileData.tempFilePath, (err, { secure_url }) => {
    if (err) {
      console.error(err);
      res.sendStatus(400);
    } else {
      const transform = '/c_fill,g_auto,h_150,w_1050/';
      const insertInd = secure_url.indexOf('upload/') + 7;
      const result = secure_url.slice(0, insertInd) + transform + secure_url.slice(insertInd);
      res.send(result);
    }
  });
});

module.exports.eventRouter = eventRouter;

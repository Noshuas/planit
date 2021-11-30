const { Event } = require('../models/eventSchema');
const { User } = require('../models/userSchema');

/*
options = {
  count: number,
  where: { <-- this will only give you the results where the property matches the value
    property: any property,
    value: any value,
  }
}
*/

const fetchEvents = async ({ count, where } = { count: 30, where: null }) => {
  if (where) {
    try {
      const { property, value } = where;
      const data = await Event.find({}).where(property).equals(value).limit(count);
      return data;
    } catch (err) {
      console.error(err);
      return err;
    }
  } else {
    try {
      const data = await Event.find({}).limit(count);
      return data;
    } catch (err) {
      console.error(err);
      return err;
    }
  }
};

const addEvent = async (event, email) => {
  try {
    const { _id } = await Event.create(event);
    const whereParam = { email };
    const whatParam = { $push: { events: _id } };
    await User.updateOne(whereParam, whatParam);
    return {
      message: 'Event Added',
      event_id: _id,
    };
  } catch (err) {
    console.error(err);
    return err;
  }
};

const deleteAllEvents = async () => {
  try {
    await Event.deleteMany({});
    return {
      message: 'Events Deleted',
    };
  } catch (err) {
    console.error(err);
    return err;
  }
};

// This will take in an array of options objects, and do all of the updates asynchronously
/*
  [
    {
      where: {
        property: 'some_property',
        value: 'some_value'
      },
      what: {
        method: '$set', <-- $push will probably be what you want for adding new availability
        field: 'some_field <-- ie. name || email || rsvps'
        value: 'New_Value'
      }
    }
  ]
*/

const updateEvent = async (updateArr) => {
  try {
    const result = await Promise.all(updateArr.map(async ({ what, where }) => {
      try {
        const whereParam = {};
        whereParam[where.property] = where.value;
        const whatParam = {};
        whatParam[what.method] = {};
        whatParam[what.method][what.field] = what.value;
        return await Event.updateOne(whereParam, whatParam);
      } catch (err) {
        console.error(err);
        return err;
      }
    }));
    return {
      message: 'all updates complete',
      result,
    };
  } catch (err) {
    console.error(err);
    return err;
  }
};

module.exports = {
  fetchEvents,
  addEvent,
  deleteAllEvents,
  updateEvent,
};

const uuidv4 = require('uuid').v4;

/**
 * Takes in a broad time range (window) and an array of events representing periods in which a user is unavailable. Returns an array of events representing all the time the user is available within the broad window.
 *
 * @param {object} window Has 'start' and 'end' props demarcating the broad window in which an event could be scheduled
 * @param {array}  events Array of events objects returned from Google Calendar API; should have 'start' and 'end' props, which are objects that each have a 'dateTime' prop. These events represent time ranges in which a user is busy.
 *
 * @returns {array} Array of event objects representing the availability of a user. Each event object has a 'start', 'end', 'id', and 'title' property.
 */
const computeAvailability = (window, events) => {
  const availability = [];
  const title = 'Available block';

  // Start and end of window in which event could take place
  const windowStart = Date.parse(window.start);
  const windowEnd = Date.parse(window.end);

  // Iterate through every 30-minute block within the window
  for (let i = windowStart; i < windowEnd; i += 1800000) {
    let blockStart = i;
    let blockEnd = i + 1800000;

    const isBlockFree = events.every((event) => {
      // start and end time for this event
      const eventStart = Date.parse(event.start.dateTime);
      const eventEnd = Date.parse(event.end.dateTime);
      if (eventStart < blockStart && eventEnd > blockStart) {
        // event starts before block but extends past blockstart
        return false;
      } if (eventStart > blockStart && eventEnd < blockEnd) {
        // event starts and ends within block
        return false;
      } if (eventEnd > blockEnd && eventStart < blockEnd) {
        // event ends after block but starts before blockend
        return false;
      }
      return true;
    });

    if (isBlockFree) {
      blockStart = new Date(blockStart).toISOString();
      blockEnd = new Date(blockEnd).toISOString();
      let lastAvailability;
      if (availability.length > 0) {
        lastAvailability = availability[availability.length - 1];
      }
      if (lastAvailability && lastAvailability.end === blockStart) {
        // change end date of last block
        lastAvailability.end = blockEnd;
      } else {
        // make a new block
        availability.push({
          id: uuidv4(),
          title,
          start: blockStart,
          end: blockEnd,
        });
      }
    }
  }

  return availability;
};

export default computeAvailability;

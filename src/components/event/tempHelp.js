/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const Helpers = {};
Helpers.CheckAvail = (window, rsvps, eventLength) => {
  const lengthInMS = eventLength * 60 * 60 * 1000;
  // const rsvpNum = rsvps.length;
  const startTimes = Helpers.allTimes(window, eventLength);
  rsvps.forEach((rsvp) => {
    rsvp.availability.forEach((block) => {
      let start = Date.parse(block.start);
      const end = Date.parse(block.end);
      while (start < end) {
        if (start + lengthInMS < end) {
          if (startTimes[start] === undefined) {
            start += 0.5 * 60 * 60 * 1000;
            continue;
          }
          startTimes[start].push(rsvp.name);
        }

        start += 0.5 * 60 * 60 * 1000;
      }
    });
  });
  // filter out times with no availability
  const results = {};
  for (const k in startTimes) {
    const attendees = startTimes[k].length;
    if (attendees > 0) {
      if (results[attendees] === undefined) {
        results[attendees] = [k];
      } else {
        results[attendees].push(k);
      }
    }
  }
  return results;
};
Helpers.allTimes = (window) => {
  const obj = {};
  let first = Date.parse(window.start);
  const end = Date.parse(window.end);
  while (first < end) {
    obj[first] = [];
    first += 0.5 * 60 * 60 * 1000;
  }
  return obj;
};
Helpers.listRSVPs = (rsvps, emOrName) => {
  const list = [];
  rsvps.forEach((rsvp) => {
    list.push(rsvp[emOrName]);
  });
  return list;
};

export default Helpers;

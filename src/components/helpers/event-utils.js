let eventGuid = 0;
// const todayStr = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

const withoutTime = (dateTime, hours, minutes) => {
  const date = new Date(dateTime.getTime());
  date.setHours(hours, minutes, 0, 0);
  return date;
};

const startDate = withoutTime(new Date(), 9, 0);
const endDate = withoutTime(new Date(), 9, 30);

export function createEventId() {
  return String(eventGuid++);
}

export function cleanData(timeSlots) {
  const availabilty = timeSlots.map((slot) => ({
    start: slot.start.toISOString(),
    end: slot.end.toISOString(),
  }));

  return availabilty;
}

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'new availability',
    start: startDate,
    end: endDate,
  },
];

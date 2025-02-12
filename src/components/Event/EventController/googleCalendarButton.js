import Button from '@mui/material/Button';
import Script from 'next/script';
import { useWatch } from 'react-hook-form';

// Variables for Google API authentication
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/calendar.events.freebusy';

const init = () => gapi.client.init({
  clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
  discoveryDocs: DISCOVERY_DOCS,
  scope: SCOPES,
}).catch(console.log);

export const GoogleCalendarButton = function ({ formatEventList, setEvents, timeFrame }) {
  const watchedTimeFrame = useWatch({ name: 'time.timeFrame' });
  const [start, end] = watchedTimeFrame || timeFrame;

  const query = {
    calendarId: 'primary',
    timeMin: new Date(start).toISOString(),
    timeMax: new Date(end).toISOString(),
    showDeleted: false,
    singleEvents: true,
    orderBy: 'startTime',
  };

  const fetchGoogleEvents = (clickEvent) => {
    gapi.auth2.getAuthInstance().signIn() // sign in
      .then(() => gapi.client.calendar.events.list(query)) // fetch events
      .then(({ result }) => {
        setEvents((prevEvents) => { // Add result to existing events
          const newEvents = formatEventList(result.items);
          return formatEventList(prevEvents.concat(newEvents), false, false);
        });
        return gapi.auth2.getAuthInstance().signOut(); // sign out
      })
      .catch(console.log);
  }

  return (
    <>
      <Script src="https://apis.google.com/js/api.js" onLoad={() => gapi.load('client:auth2', init)} />
      <Button onClick={fetchGoogleEvents}>Import Google Calendar</Button>
    </>
  );
};

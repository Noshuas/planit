/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import styles from '../../styles/FetchGoogleCalendar.module.css';
import computeAvailability from '../helpers/googleCalendarUtils';

const FetchGoogleCalendar = ({
  windowStart = '2021-07-12T15:00:00-07:00',
  windowEnd = '2021-07-18T15:00:00-07:00',
  storeGoogleAvailability,
  googleClientId,
}, ...props) => {
  // Variables for Google API authentication
  const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
  const SCOPES = 'https://www.googleapis.com/auth/calendar.events.freebusy';

  const [calendarDataIsLoading, setCalendarDataIsLoading] = useState(false);
  const [showNoCalendarDataMsg, setShowNoCalendarDataMsg] = useState(false);

  // Clear the 'no calendar data' message after three seconds
  useEffect(() => {
    if (showNoCalendarDataMsg) {
      setTimeout(() => {
        setShowNoCalendarDataMsg(false);
      }, 3000);
    }
  }, [showNoCalendarDataMsg]);

  /**
   *  Initialize the Google API client library
   */
  const initClient = () => gapi.client.init({
    clientId: googleClientId,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES,
  })
    .then(() => { }, (error) => {
      console.log(error);
    });

  /**
   *  Sign in the user to Google upon button click, fetch events, log user out of Google
   */
  const handleClick = (event) => gapi.auth2.getAuthInstance().signIn()
    .catch((err) => {
      console.log('Error attempting to sign into Google');
      console.log(err);
    })
    .then(() => {
      console.log('User logged into Google successfully');
      return loadEvents();
    })
    .catch((err) => {
      console.log('Error attempting to fetch event data from Google');
      console.log(err);
    })
    .then(() => {
      setCalendarDataIsLoading(true);
      return gapi.auth2.getAuthInstance().signOut();
    })
    .catch((err) => {
      setCalendarDataIsLoading(false);
      console.log('Error logging user out of Google');
    })
    .then(() => {
      setCalendarDataIsLoading(false);
      console.log('User logged out of Google successfully');
    });

  /**
   * Fetch the events from the user's Google Calendar and pass them to the storeGoogleAvailability function from props
   */
  const loadEvents = () => gapi.client.calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date(windowStart)).toISOString(),
    timeMax: (new Date(windowEnd)).toISOString(),
    showDeleted: false,
    singleEvents: true,
    orderBy: 'startTime',
  })
    .then((response) => {
      const events = response.result.items;
      if (events.length > 0) {
        const window = {
          start: windowStart,
          end: windowEnd,
        };
        const availability = computeAvailability(window, events);
        storeGoogleAvailability(availability);
      } else {
        setShowNoCalendarDataMsg(true);
      }
    });

  // Initialize Google API auth once component has mounted

  gapi.load('client:auth2', initClient);

  return (
    <div className={styles.container}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        disabled={calendarDataIsLoading}
      >
        {calendarDataIsLoading ? 'Loading Calendar Data' : 'Fetch Google Calendar'}
      </Button>
      {showNoCalendarDataMsg && <p className={styles.noCalendarDataMsg}>No events found</p>}
      <p className={styles.googleFetchHelpText}>
        <b>Plan.it</b>
        {' '}
        can fill in your availability automatically
        from your Google Calendar. You will be able
        to adjust your availability before submitting.
      </p>
    </div>
  );
};

export default FetchGoogleCalendar;

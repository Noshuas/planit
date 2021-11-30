/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import Button from '@material-ui/core/Button';
import { INITIAL_EVENTS, createEventId, cleanData } from './helpers/event-utils';
import style from '../styles/Availability.module.css';
import FetchGoogleCalendar from './FetchGoogleCalendar';

export default function TimeBlock({
  onClose, googleClientId, windowEnd, windowStart,
}) {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [initialEvents] = useState(INITIAL_EVENTS);
  const [googEvents, setGoogEvents] = useState([]);
  // const [goog, setGoog] = useState([]);

  const handleDateSelect = (selectInfo) => {
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    calendarApi.addEvent({
      id: createEventId(),
      title: 'new availability',
      start: selectInfo.startStr,
      end: selectInfo.endStr,
    });
  };

  const storeGoogleAvailability = (timeblocks) => {
    // setInitialEvents(timeblocks);
    setGoogEvents(timeblocks);
  };

  const handleEventClick = (clickInfo) => {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  };

  const handleEvents = (events) => {
    setCurrentEvents(events);
  };

  const saveTimeSlots = () => {
    const availability = cleanData(currentEvents);
    onClose(null, availability);
  };

  return (
    <div>
      <FetchGoogleCalendar
        googleClientId={googleClientId}
        storeGoogleAvailability={storeGoogleAvailability}
        windowStart={windowStart}
        windowEnd={windowEnd}
      />
      <FullCalendar
        plugins={[interactionPlugin, timeGridPlugin, dayGridPlugin]}
        // key={initialEvents}
        initialView="timeGridWeek"
        validRange={{
          start: windowStart,
          end: windowEnd,
        }}
        editable
        selectable
        selectMirror
        nowIndicator
        initialEvents={initialEvents}
        select={handleDateSelect}
        eventClick={handleEventClick}
        eventsSet={handleEvents}
        eventColor="#985c9c"
        events={googEvents}
      />
      <div className={style.submit}>
        <Button autoFocus onClick={saveTimeSlots} variant="outlined" color="primary">
          Submit
        </Button>
      </div>
    </div>
  );
}

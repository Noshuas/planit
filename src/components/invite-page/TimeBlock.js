/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import Button from '@mui/material/Button';
import { INITIAL_EVENTS, createEventId, cleanData } from '../helpers/event-utils';
import style from '../../styles/Availability.module.css';
import FetchGoogleCalendar from './FetchGoogleCalendar';

export default function TimeBlock({
  onClose, googleClientId, windowEnd, windowStart,
}) {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [initialEvents] = useState(INITIAL_EVENTS);
  const [googEvents, setGoogEvents] = useState([]);

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

  const handleEventClick = (clickInfo) => {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  };

  const saveTimeSlots = () => {
    console.log('currentEvents:', currentEvents);
    const availability = cleanData(currentEvents);
    console.log('availability:', availability);
    onClose(null, availability);
  };

  return (
    <div>
      <FetchGoogleCalendar
        googleClientId={googleClientId}
        storeGoogleAvailability={setGoogEvents}
        windowStart={windowStart}
        windowEnd={windowEnd}
      />
      <FullCalendar
        plugins={[interactionPlugin, timeGridPlugin, dayGridPlugin]}
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
        eventsSet={setCurrentEvents}
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

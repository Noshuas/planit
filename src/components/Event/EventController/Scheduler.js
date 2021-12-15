import FullCalendar from "@fullcalendar/react";
import Interaction from "@fullcalendar/interaction";
import timeGrid from "@fullcalendar/timegrid";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";


export const Scheduler = (
  { timeFrame, myref, color = 'green', events, scheduling, }
) => {

  const [start, end] = timeFrame
  const [title, duration] = useFormContext().getValues(['title', 'time.duration'])
  const handleEventSelect = ({ event }) => event.remove()

  const handleSelect = ({ start, end, view: { calendar } }) => {
    calendar.unselect()

    if (!scheduling)
      return calendar.addEvent({ title: 'Unavailable', start, end })

    calendar.getEventById(-1)?.remove();
    calendar.addEvent({ title, start, id: -1 })
  }


  return (
    <FullCalendar
      ref={myref}
      plugins={[timeGrid, Interaction]}
      initialView="timeGridWeek"
      editable
      selectable
      selectMirror
      expandRows
      height={1800}               // There is no way to maually size the rows
      headerToolbar={false}       // so I have to fix the length, and the rows
      stickyHeaderDates           // will expand to the correct height.
      allDaySlot={false}
      snapDuration='00:15:00'
      slotDuration='01:00:00'
      forceEventDuration
      duration={duration}
      // defaultTimedEventDuration={duration}
      eventColor={color}
      validRange={{ start, end }}
      eventTimeFormat={{
        hour: 'numeric',
        minute: '2-digit',
        omitZeroMinute: true,
        meridiem: 'narrow'
      }}
      events={events}
      select={handleSelect}
      eventClick={handleEventSelect}
    />
  )
}

export default Scheduler;

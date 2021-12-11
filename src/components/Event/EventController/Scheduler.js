import FullCalendar from "@fullcalendar/react";
import Interaction from "@fullcalendar/interaction";
import timeGrid from "@fullcalendar/timegrid";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { createRef, useCallback, useEffect, useState } from "react";
import { Box } from "@mui/system";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";


export const Scheduler = ({ start, end, myref, color = 'green' }) => {

  const handleEventSelect = useCallback(({ event }) => event.remove())
  const handleSelect = useCallback(({ start, end, view: { calendar } }) => {
    calendar.unselect()
    calendar.addEvent({
      title: 'Unavailable',
      start: new Date(start),
      end: new Date(end),
    })
  })

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
      eventColor={color}
      validRange={{ start, end }}
      eventTimeFormat={{
        hour: 'numeric',
        minute: '2-digit',
        omitZeroMinute: true,
        meridiem: 'narrow'
      }}
      select={handleSelect}
      eventClick={handleEventSelect}
    />
  )
}

export default Scheduler;

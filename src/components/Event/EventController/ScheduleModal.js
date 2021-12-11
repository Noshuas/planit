import FullCalendar from "@fullcalendar/react";
import Interaction from "@fullcalendar/interaction";
import timeGrid from "@fullcalendar/timegrid";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { createRef, useCallback, useEffect, useState } from "react";
import { Box } from "@mui/system";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import Scheduler from "./Scheduler";


export const ScheduleModal = ({ email, open, handleClose }) => {
  const [events, setEvents] = useState([]);
  const [calendar, setCalendar] = useState();

  const calendarRef = useCallback(node => node && setCalendar(node._calendarApi), [])
  const paginateRight = useCallback(() => calendar.next());
  const paginateLeft = useCallback(() => calendar.prev());
  const contentRef = useCallback(node => node && node.scroll(0, 750), [])

  const submitEvents = useCallback(() => {
    setEvents(
      calendar.getEvents()
        .map(({ start, end }) => ({ start: start.getTime(), end: end.getTime() }))
        .sort((a, b) => a.start - b.start)
        .reduce((accum, event, i) => {
          if (!accum.length) { return [event]; }
          const prev = accum[accum.length - 1]
          event.start <= prev.end
            ? prev.end = Math.max(event.end, prev.end)
            : accum.push(event);

          return accum;
        }, []))
    handleClose();
  })

  useEffect(()=> {
    console.log(events);
  }, [events])

  return (
    <Dialog open={open} maxWidth='xl' fullWidth={true} sx={{ height: '97%' }}>
      <DialogTitle> Enter your availability
        <Box sx={{ float: 'right' }}>
          <IconButton onClick={paginateLeft}><NavigateBefore /></IconButton>
          <IconButton onClick={paginateRight}><NavigateNext /></IconButton>
        </Box>
      </DialogTitle>
      <DialogContent ref={contentRef} dividers sx={{ paddingTop: 0 }}>
        <Scheduler myref={calendarRef} />
      </DialogContent>
      <DialogActions>
        <Button>Import Google Calendar</Button>
        <Button onClick={submitEvents}>Submit Availability</Button>
        <Button onClick={handleClose}>Exit</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ScheduleModal;

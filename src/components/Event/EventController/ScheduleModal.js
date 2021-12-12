import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import Scheduler from "./Scheduler";
import { GoogleCalendarButton } from './googleCalendarButton';

const formatEventList = (list, map = true, sort = true) => {
  console.log(list)
  if (map) {
    list = list.map(({ start, end }) => {
      return (start.dateTime)
        ? {
          start: new Date(start.dateTime).getTime(),
          end: new Date(end.dateTime).getTime()
        }
        : {
          start: start.getTime(),
          end: end.getTime()
        }
    })
  }

  if (sort)
    list.sort((a, b) => a.start - b.start)

  return list.reduce((accum, event) => {
    if (!accum.length) { return [event] }

    const prev = accum[accum.length - 1]
    event.start <= prev.end
      ? prev.end = Math.max(event.end, prev.end)
      : accum.push(event);
    return accum;
  }, [])
}

export const ScheduleModal = ({ email, open, handleClose }) => {
  const [events, setEvents] = useState([]);
  const [calendar, setCalendar] = useState();

  const calendarRef = useCallback(node => node && setCalendar(node._calendarApi), [])
  const paginateRight = useCallback(() => calendar.next());
  const paginateLeft = useCallback(() => calendar.prev());
  const contentRef = useCallback(node => node && node.scroll(0, 750), [])

  const submitEvents = useCallback(() => {
    setEvents(formatEventList(calendar.getEvents()))
    handleClose();
  })

  useEffect(() => {
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
        <Scheduler myref={calendarRef} events={events} />
      </DialogContent>
      <DialogActions>
        <GoogleCalendarButton {...{ formatEventList, setEvents }} />
        <Button onClick={submitEvents}>Submit Availability</Button>
        <Button onClick={handleClose}>Exit</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ScheduleModal;

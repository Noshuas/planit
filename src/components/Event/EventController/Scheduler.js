import FullCalendar from "@fullcalendar/react";
import Interaction from "@fullcalendar/interaction";
import timeGrid from "@fullcalendar/timegrid";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { createRef, useCallback, useEffect } from "react";
import { Box } from "@mui/system";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";


export const ScheduleModal = ({ start, end, email, color = 'green' }) => {

  const calendarRef = createRef();
  const paginateRight = useCallback(() => calendarRef.current._calendarApi.next());
  const paginateLeft = useCallback(() => calendarRef.current._calendarApi.prev());
  const handleEventSelect = useCallback(({ event }) => event.remove())

  const contentRef = useCallback(node => {
    if (node)
      node.scroll(0, 750)
  }, []);

  const handleSelect = useCallback((e) => {
    const { calendar } = e.view
    calendar.unselect()
    calendar.addEvent({
      title: 'Unavailable',
      start: new Date(e.start),
      end: new Date(e.end),
    })
  })

  const submitEvents = useCallback(()=>{
    let events = calendarRef.current._calendarApi.getEvents();
    events = events.map(({start, end}) => {
      return [start.getTime()/1000, end.getTime()/1000]
    })


  });



  return (
    <Dialog open={true} maxWidth='xl' fullWidth={true} sx={{ height: '97%' }}>
      <DialogTitle>
        Enter your availability
        <Box sx={{ float: 'right' }}>
          <IconButton onClick={paginateLeft}>
            <NavigateBefore />
          </IconButton>
          <IconButton onClick={paginateRight}>
            <NavigateNext />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent ref={contentRef} dividers sx={{ paddingTop: 0 }}>
        <FullCalendar
          ref={calendarRef}
          plugins={[timeGrid, Interaction]}
          initialView="timeGridWeek"
          editable
          selectable
          selectMirror
          height={1800}
          headerToolbar={false}
          stickyHeaderDates
          allDaySlot={false}
          snapDuration='00:15:00'
          slotDuration='01:00:00'
          expandRows
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
      </DialogContent>
      <DialogActions>
        <Button>Import Google Calendar</Button>
        <Button onClick={submitEvents}>Submit Availability</Button>
        <Button>Exit</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ScheduleModal;

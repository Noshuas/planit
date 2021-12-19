import NavigateBefore from '@mui/icons-material/NavigateBefore'
import NavigateNext from '@mui/icons-material/NavigateNext';
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/system/Box';
import { useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { GoogleCalendarButton } from './googleCalendarButton';
import Scheduler from './Scheduler';

const formatEventList = (list, map = true, sort = true) => {
  if (map) {
    list = list.map(({ start, end }) => ((start.dateTime)
      ? {
        start: new Date(start.dateTime).getTime(),
        end: new Date(end.dateTime).getTime(),
      }
      : {
        start: start.getTime(),
        end: end.getTime(),
      }));
  }

  if (sort) list.sort((a, b) => a.start - b.start);

  return list.reduce((accum, event) => {
    if (!accum.length) { return [event]; }

    const prev = accum[accum.length - 1];
    event.start <= prev.end
      ? prev.end = Math.max(event.end, prev.end)
      : accum.push(event);
    return accum;
  }, []);
};

const format = (date) => new Date(date).toLocaleDateString();

export const ScheduleModal = function ({
  open, handleClose, attendees, timeFrame,
}) {
  const { setValue, getValues } = useFormContext();
  const [calendar, setCalendar] = useState();
  const calendarRef = useCallback((node) => node && setCalendar(node._calendarApi), []);
  const paginateRight = useCallback(() => calendar.next(), [calendar]);
  const paginateLeft = useCallback(() => calendar.prev(), [calendar]);
  const contentRef = useCallback((node) => node && node.scroll(0, 750), []);

  const scheduling = !!attendees;
  const [events, setEvents] = useState(
    scheduling
      ? (
        attendees.map((person) => person.conflicts.map((conflict) => {
          conflict.display = 'background';
          conflict.title = person.email.slice(0, person.email.indexOf('@'));
          conflict.className = 'fc-bg-event';
          return conflict;
        })).flat()
      )
      : [],
  );

  const submitEvents = useCallback(() => {
    const calEvents = calendar.getEvents();
    const lastAdded = calendar.getEventById(-1);
    calEvents.forEach((e) => e.remove());

    scheduling
      ? setEvents(calEvents)
      : setEvents(formatEventList(calEvents));

    lastAdded
      && setValue('time.scheduled', new Date(lastAdded.start).getTime(), { shouldDirty: true });
    lastAdded?.remove();
    handleClose();
  }, [calendar, handleClose, scheduling, setValue]);

  useEffect(() => {
    if (!scheduling) setValue('conflicts', events);
  }, [events, scheduling, setValue]);

  return (
    <Dialog open={open} maxWidth="xl" fullWidth sx={{ height: '97%' }}>
      <DialogTitle>
        Enter your
        {' '}
        {(timeFrame) ? `${format(timeFrame[0])} - ${format(timeFrame[1])}` : null}
        {' '}
        availability
        <Box sx={{ float: 'right' }}>
          <IconButton onClick={paginateLeft}><NavigateBefore /></IconButton>
          <IconButton onClick={paginateRight}><NavigateNext /></IconButton>
        </Box>
      </DialogTitle>
      <DialogContent ref={contentRef} dividers sx={{ paddingTop: 0 }}>
        <Scheduler
          myref={calendarRef}
          {...{ timeFrame, events, scheduling }}
        />
      </DialogContent>
      <DialogActions>
        {!scheduling && <GoogleCalendarButton {...{ formatEventList, setEvents, timeFrame }} />}
        <Button onClick={submitEvents}>{scheduling ? 'Schedule Event' : 'Submit Availibility'}</Button>
        <Button onClick={handleClose}>Exit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ScheduleModal;

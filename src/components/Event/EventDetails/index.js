import Grid from '@mui/material/Grid';
import EventDuration from './EventDuration';
import EventLocation from './EventLocation';
import EventWindow from './EventWindow';
import ScheduledFor from './ScheduledFor';

export const EventDetails = function ({ time, location }) {
  return (
    <Grid container direction="row" spacing={2}>
      <ScheduledFor scheduled={time?.scheduled} />
      <EventWindow time={time?.frame} />
      <EventDuration duration={time?.duration} />
      <EventLocation {...{ location }} />
    </Grid>
  );
};

export default EventDetails;

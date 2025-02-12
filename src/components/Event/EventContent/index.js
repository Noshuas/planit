import Grid from '@mui/material/Grid'
import EventDescription from './EventDescription';
import EventTitle from './EventTitle';

export const EventContent = function ({ title, description }) {
  return (
    <Grid container direction="column" spacing={1}>
      <Grid item sx={{ minHeight: '4em' }}>
        <EventTitle {...{ title }} />
      </Grid>
      <Grid item>
        <EventDescription {...{ description }} />
      </Grid>
    </Grid>
  );
};

export default EventContent;

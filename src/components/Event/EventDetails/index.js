import { Grid, Typography } from '@mui/material';
import { useWatch, useFormContext } from 'react-hook-form';
import { grid } from '@mui/system';
import EventDuration from './EventDuration';
import Input from './Input';
import EventLocation from './EventLocation';
import EventWindow from './EventWindow';
import EditableLabel from './EditableLabel';
import ScheduledFor from './ScheduledFor';

export var EventDetails = function ({ time, location }) {
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

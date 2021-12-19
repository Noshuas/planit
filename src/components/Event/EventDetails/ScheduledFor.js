import Grid from '@mui/material/Grid';
import { useWatch } from 'react-hook-form';
import EditableLabel from './EditableLabel';

export var ScheduledFor = function ({ scheduled }) {
  const newScheduled = useWatch({ name: 'time.scheduled', defaultValue: scheduled });

  return (!newScheduled)
    ? ''
    : (
      <Grid item sm={3} md={12}>
        <EditableLabel label="Event Time:">
          {new Date(newScheduled).toLocaleString()}
        </EditableLabel>
      </Grid>
    );
};

export default ScheduledFor;

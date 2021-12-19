import Grid from '@mui/material/Grid';
import { useCallback, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { EditableLabel } from './EditableLabel';
import { Input } from './Input';

export const EventDuration = function ({ duration }) {
  const [editMode, setEditMode] = useState(false);
  const handleClick = useCallback(() => setEditMode(true),[]);
  const handleBlur = useCallback(() => setEditMode(false),[]);
  const newDuration = useWatch({ name: 'time.duration', defaultValue: duration || 0 });

  return (
    <Grid item sm={3} md={12}>
      {editMode
        ? (
          <Input
            onBlur={handleBlur}
            name="time.duration"
            type="number"
            label="Duration in hours"
            value={newDuration || 1}
            size="small"
          />
        )
        : (
          <EditableLabel
            label="Event Duration:"
            handleClick={handleClick}
          >
            {' '}
            {`${newDuration || 1} hour(s)`}
          </EditableLabel>
        )}
    </Grid>
  );
};

export default EventDuration;

import { Grid } from '@mui/material';
import { useCallback, useState } from 'react';
import { useWatch } from 'react-hook-form';
import EditableLabel from './EditableLabel';
import { Input } from './Input';

export var EventLocation = function ({ location }) {
  const [editMode, setEditMode] = useState(false);
  const handleClick = useCallback(() => setEditMode(true),[]);
  const handleBlur = useCallback(() => setEditMode(false),[]);
  const newLocation = useWatch({ name: 'location', defaultValue: location });

  return (
    <Grid item sm={3} md={12}>
      {editMode
        ? (
          <Input
            onBlur={handleBlur}
            name="location"
            label="Event Location"
            value={newLocation || ''}
            size="small"
          />
        )
        : (
          <EditableLabel label="Event Location:" handleClick={handleClick}>
            {newLocation || 'Enter a location'}
          </EditableLabel>
        )}
    </Grid>
  );
};

export default EventLocation;

import { Grid } from "@mui/material";
import { useCallback, useState } from "react";
import { useWatch } from "react-hook-form";
import EditableLabel from "./EditableLabel";
import { Input } from './Input';

export const EventLocation = ({ location }) => {
  const [editMode, setEditMode] = useState(!location);
  const handleClick = useCallback(() => setEditMode(true));
  const handleBlur = useCallback(() => setEditMode(false));
  const newLocation = useWatch({ name: 'location', defaultValue: location })

  return (
    <Grid item>
      {editMode
        ?
        <Input
          onBlur={handleBlur}
          name="location"
          label="Event Location"
          value={newLocation}
          size='small'
        />
        :
        <EditableLabel
          label={`Event Location: ${newLocation || 'unset'}   `}
          handleClick={handleClick}
        />
      }
    </Grid>
  )
}

export default EventLocation;

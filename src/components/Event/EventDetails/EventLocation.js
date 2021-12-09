import { Edit } from "@mui/icons-material";
import { Grid, IconButton, Slide, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { useWatch } from "react-hook-form";
import EditableLabel from "./EditableField";
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
        />
        :
        <EditableLabel
          label={`Event Location: ${newLocation}   `}
          handleClick={handleClick}
        />
      }
    </Grid>
  )
}

export default EventLocation;

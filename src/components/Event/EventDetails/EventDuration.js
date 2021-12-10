import { Edit } from "@mui/icons-material";
import { Grid, IconButton, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { useWatch } from "react-hook-form";
import EditIcon, { EditableLabel } from "./EditableLabel";
import { Input } from "./Input";

export const EventDuration = ({ duration }) => {
  const [editMode, setEditMode] = useState(!duration);
  const handleClick = useCallback(() => setEditMode(true));
  const handleBlur = useCallback(() => setEditMode(false));
  const newDuration = useWatch({ name: 'duration', defaultValue: duration })

  return (
    <Grid item>
      {editMode
        ?
        <Input
          onBlur={handleBlur}
          name="duration"
          type='number'
          label="Duration in hours"
          value={newDuration}
          size='small'
        />
        :
        <EditableLabel
          label={`Event Duration: ${newDuration} hours`}
          handleClick={handleClick}
        />
      }
    </Grid >
  )
}

export default EventDuration;

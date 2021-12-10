import { Grid, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { useWatch } from "react-hook-form";
import EditableLabel from "../EventDetails/EditableLabel";
import { Input } from '../EventDetails/Input';


export const EventDescription = ({ description }) => {
  const [editMode, setEditMode] = useState(!description);
  const handleClick = useCallback(() => setEditMode(true));
  const handleBlur = useCallback(() => setEditMode(false));
  const newDescription = useWatch({ name: 'description', defaultValue: description })

  return (
    <>
      {editMode
        ?
        <Input
          onBlur={handleBlur}
          name="description"
          label="New Event Description"
          value={newDescription}
          multiline
          rows='15'
          fullWidth
        />
        :
        <EditableLabel
          label={`${newDescription}`}
          handleClick={handleClick}
        />}
    </>
  )
};

export default EventDescription;

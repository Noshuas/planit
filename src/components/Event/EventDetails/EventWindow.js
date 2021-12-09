import { Grid } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { useWatch } from "react-hook-form";
import DateRangePicker from "./DateRangePicker";
import EditableLabel from "./EditableField";
import Typography from "@mui/material/Typography";


export const EventWindow = ({ time }) => {
  const [editMode, setEditMode] = useState(!time);
  const handleClick = useCallback(() => setEditMode(true));
  const handleBlur = useCallback(() => setEditMode(false));
  const [newStart, newEnd] = useWatch({ name: 'timeFrame', defaultValue: time })
  const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' }
  const format = date => new Date(date).toLocaleDateString(undefined, options);

  return (
    <>
      <Grid item>
        <Typography variant="h6">Event Window:</Typography>
        <Typography varient="subtitle1">{format(newStart)} - {format(newEnd)}</Typography>
      </Grid>
      <Grid item>
        <DateRangePicker />
      </Grid>
    </>
  )
}

export default EventWindow;

import { Grid, Fade } from "@mui/material";
import { forwardRef, useCallback, useMemo, useRef, useState } from "react";
import { useWatch } from "react-hook-form";
import DateRangePicker from "./DateRangePicker";
import EditableLabel from "./EditableLabel";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { ImportantDevices } from "@mui/icons-material";


export const EventWindow = ({ time }) => {
  const [editMode, setEditMode] = useState(!time);
  const handleClick = useCallback(() => setEditMode(true));
  const handleBlur = useCallback(() => setEditMode(false));
  const [newStart, newEnd] = useWatch({ name: 'time.timeFrame', defaultValue: time })
  const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' }
  const format = date => new Date(date).toLocaleDateString(undefined, options);

  const [hovered, setHovered] = useState(false);
  const handleMouseEnter = useCallback(() => setHovered(true));
  const handleMouseLeave = useCallback(() => setHovered(false));
  const containerRef = useRef(null);

  return (
    <>
      <Grid item onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} spacing={0} container direction='column' alignContent='stretch' >
        <Box sx={{ display: 'flex', flexFlow: 'row wrap' }} ref={containerRef} >
          <Typography variant="h6" >Event Window:</Typography>
          <Fade timeout={350} in={hovered} >
            <DateRangePicker />
          </Fade>
        </Box>
        <Typography variant="subtitle2">{format(newStart)} - {format(newEnd)}</Typography>
      </Grid>
    </>
  )
}

export default EventWindow;

import { Grid, Slide } from "@mui/material";
import { forwardRef, useCallback, useMemo, useRef, useState } from "react";
import { useWatch } from "react-hook-form";
import DateRangePicker from "./DateRangePicker";
import EditableLabel from "./EditableField";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";


export const EventWindow = ({ time }) => {
  const [editMode, setEditMode] = useState(!time);
  const handleClick = useCallback(() => setEditMode(true));
  const handleBlur = useCallback(() => setEditMode(false));
  const [newStart, newEnd] = useWatch({ name: 'timeFrame', defaultValue: time })
  const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' }
  const format = date => new Date(date).toLocaleDateString(undefined, options);

  const [hovered, setHovered] = useState(false);
  const handleMouseEnter = useCallback(() => setHovered(true));
  const handleMouseLeave = useCallback(() => setHovered(false));
  const containerRef = useRef(null);

  return (
    <>
      <Grid item onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
        <Box sx={{display: 'flex', flexFlow: 'row nowrap'}} ref={containerRef}>
          <Typography variant="h6" sx={{ display: 'inline-block', marginRight: '1em' }}> Event Window: </Typography>
          < Slide
            timeout={400}
            direction='left'
            in={hovered}
            container={containerRef.current}
          >
            <DateRangePicker />
          </Slide>
          </Box>
        <Typography varient="subtitle1">{format(newStart)} - {format(newEnd)}</Typography>
      </Grid>
    </>
  )
}

export default EventWindow;

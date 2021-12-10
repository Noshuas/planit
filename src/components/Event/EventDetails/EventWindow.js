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
  const [newStart, newEnd] = useWatch({ name: 'timeFrame', defaultValue: time })
  const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' }
  const format = date => new Date(date).toLocaleDateString(undefined, options);

  const [hovered, setHovered] = useState(false);
  const handleMouseEnter = useCallback(() => setHovered(true));
  const handleMouseLeave = useCallback(() => setHovered(false));
  const containerRef = useRef(null);

  return (
    <>
      <Grid item onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} spacing={0} container direction='column' alignContent='stretch'>
        <Box sx={{ display: 'flex', flexFlow: 'row wrap' }} ref={containerRef} >
          <Typography variant="h6" sx={{ display: 'inline-block', marginRight: '.75em' }}> Event Window: </Typography>
          < Fade
            timeout={400}
            // direction='left'
            in={hovered}
            // container={containerRef.current}
          >
            <DateRangePicker />
          </Fade>
        </Box>
        <Grid item>
          <Typography varient="subtitle1">{format(newStart)} - {format(newEnd)}</Typography>
        </Grid>
      </Grid>
    </>
  )
}

export default EventWindow;

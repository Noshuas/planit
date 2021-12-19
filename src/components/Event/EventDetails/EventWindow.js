import Fade from '@mui/material/Fade'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { useCallback, useRef, useState } from 'react';
import { useWatch } from 'react-hook-form';
import DateRangePicker from './DateRangePicker';

export const EventWindow = function ({ time }) {
  const [editMode, setEditMode] = useState(!time);
  const handleClick = useCallback(() => setEditMode(true),[]);
  const handleBlur = useCallback(() => setEditMode(false),[]);
  const [newStart, newEnd] = useWatch({ name: 'time.timeFrame', defaultValue: time });
  const options = {
    weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric',
  };
  const format = (date) => new Date(date).toLocaleDateString(undefined, options);

  const [hovered, setHovered] = useState(false);
  const handleMouseEnter = useCallback(() => setHovered(true) ,[]);
  const handleMouseLeave = useCallback(() => setHovered(false),[]);
  const containerRef = useRef(null);

  return (
    <Grid item onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} sm={3} md={12} container direction="column" alignContent="stretch" minWidth='12em'>
      <Box sx={{ display: 'flex', flexFlow: 'row wrap' }} ref={containerRef}>
        <Typography variant="h6">Event Window:</Typography>
        <Fade timeout={350} in={hovered}>
          <DateRangePicker />
        </Fade>
      </Box>
      <Typography variant="subtitle2">
        {format(newStart)}
        {' '}
        -
        {' '}
        {format(newEnd)}
      </Typography>
    </Grid>
  );
};

export default EventWindow;

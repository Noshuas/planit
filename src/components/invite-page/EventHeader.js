import {
  Card, CardContent, CardHeader, Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useCallback } from 'react';
import Label from './Label';

export var EventHeader = function ({
  message, time, location, title,
}) {
  const { scheduled, timeFrame: [start, end], duration } = time;
  const format = useCallback((time) => new Date(time).toLocaleDateString(),[]);

  return (
    <Card sx={{ padding: '1em' }}>
      <Typography variant="h4">{message}</Typography>
      <CardContent>
        <Label label="What">
          {title}
        </Label>
        <Label label="When">
          {scheduled ? new Date(scheduled).toLocaleString() : `${format(start)} - ${format(end)} (unscheduled)`}
        </Label>
        <Label label="Duration">
          {`${duration} hours`}
        </Label>
        <Label label="Where">
          {location}
        </Label>
      </CardContent>
    </Card>
  );
};

export default EventHeader;

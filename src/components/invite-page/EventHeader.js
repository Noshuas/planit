import { Card, CardHeader, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback } from "react";
import Label from "./Label";


export const EventHeader = ({ message, time, location, title}) => {
  const { scheduled, timeFrame: [start, end], duration } = time;
  const format = useCallback(time => new Date(time).toLocaleDateString());

  return (
    <Card sx={{padding: '1em'}}>
      <CardHeader title={message} />
      <Label label='What'>
        {title}
      </Label>
      <Label label='When'>
        {scheduled || `${format(start)} - ${format(end)} (unscheduled)`}
      </Label>
      <Label label='Duration'>
        {`${duration} hours`}
      </Label>
      <Label label="Where">
        {location}
      </Label>
    </Card>
  )
}

export default EventHeader;

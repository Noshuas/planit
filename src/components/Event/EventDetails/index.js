import { Grid, Typography } from "@mui/material";
import EventDuration from "./EventDuration";
import Input from "./Input";
import EventLocation from "./EventLocation";
import EventWindow from "./EventWindow";
import { useWatch } from "react-hook-form";


export const EventDetails = ({ time: { duration, frameStart, frameEnd, scheduled }, location }) => {
  const newScheduled = useWatch('scheduled', scheduled);
  return (
    <>
      {typeof newScheduled !== 'object' &&
        <Typography>Scheduled for {new Date(newScheduled).toLocaleString()}</Typography>}
      <EventWindow time={[frameStart, frameEnd]} />
      <EventDuration {...{ duration }} />
      <EventLocation {...{ location }} />
    </>
  )
}

export default EventDetails;

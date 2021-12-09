import { Grid } from "@mui/material";
import EventDuration from "./EventDuration";
import Input from "./Input";
import EventLocation from "./EventLocation";
import EventWindow from "./EventWindow";


export const EventDetails = ({ time: {duration, frameStart, frameEnd}, status, location }) => {
  console.log(location);
  return (
    <Grid item sm={4} container spacing={2} direction='column' alignContent='center' >
      <EventWindow time={[frameStart, frameEnd]} />
      <EventDuration {...{ duration }} />
      <EventLocation {...{ location }} />
    </Grid>
  )
}

export default EventDetails;

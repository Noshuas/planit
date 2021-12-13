import { Grid, Typography } from "@mui/material";
import EventDuration from "./EventDuration";
import Input from "./Input";
import EventLocation from "./EventLocation";
import EventWindow from "./EventWindow";
import { useWatch } from "react-hook-form";


export const EventDetails = ({ time, location }) => {
  const newScheduled = useWatch('scheduled', time?.scheduled);

  return (
      <Grid container direction='column' spacing={2}>

        {typeof newScheduled !== 'object' &&
          <Typography>Scheduled for {new Date(newScheduled).toLocaleString()}</Typography>}
        <EventWindow time={time?.frame} />
        <EventDuration duration={time?.duration} />
        <EventLocation {...{ location }} />
      </Grid>
  )
}

export default EventDetails;

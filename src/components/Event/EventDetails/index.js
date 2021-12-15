import { Grid, Typography } from "@mui/material";
import EventDuration from "./EventDuration";
import Input from "./Input";
import EventLocation from "./EventLocation";
import EventWindow from "./EventWindow";
import { useWatch } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import EditableLabel from "./EditableLabel";
import { grid } from "@mui/system";
import ScheduledFor from "./ScheduledFor";

export const EventDetails = ({ time, location }) => (
  <Grid container direction='column' spacing={2}>
    <ScheduledFor scheduled={time?.scheduled} />
    <EventWindow time={time?.frame} />
    <EventDuration duration={time?.duration} />
    <EventLocation {...{ location }} />
  </Grid>
)


export default EventDetails;

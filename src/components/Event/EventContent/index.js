import { Card, Grid } from "@mui/material";
import EventDescription from "./EventDescription";
import EventTitle from "./EventTitle";


export const EventContent = ({ title, description }) => {

  return (
    <>
      <Grid item sx={{ alignSelf: 'start' }}>
        <EventTitle {...{ title }} />
      </Grid>
      <Grid item sx={{ alignSelf: 'stretch', marginLeft: '2.5em' }}>
        <EventDescription  {...{ description }} />
      </Grid>
    </>
  )
}

export default EventContent;

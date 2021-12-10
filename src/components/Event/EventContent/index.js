import { Grid } from "@mui/material";
import EventDescription from "./EventDescription";
import EventTitle from "./EventTitle";


export const EventContent = ({ title, description }) => {

  return (
    <Grid item spacing={3} xs={8} colums={1} container direction="column" >
      <Grid item sx={{alignSelf: 'start'}}>
        <EventTitle {...{ title }} />
      </Grid>
      <Grid item sx={{alignSelf: 'stretch', marginLeft: '2.5em'}}>
        <EventDescription  {...{ description }} />
      </Grid>
    </Grid>
  )
}

export default EventContent;

import { AccessTime, DeleteForever, Save, Share } from "@mui/icons-material";
import { Button, Fade, Grid } from "@mui/material";
import { useState } from "react";
import { useFormState } from "react-hook-form";


export const EventController = ({ e, control }) => {
  const [edited, setEdited] = useState(false);
  const { isDirty, isSubmitSuccessful } = useFormState();

  return (
    <Grid container spacing={2} direction="column" wrap item alignItems='end' alignContent='end'>
      <Grid item>
        <Button variant='outlined' endIcon={<AccessTime />}> Schedule Event </Button>
      </Grid>
      <Grid item>
        <Button variant='outlined' endIcon={<Share />}> Copy Invite Link </Button>
      </Grid>
      <Grid item>
        <Fade in={isDirty} timeout={800}>
          <Button type='submit' variant='contained' endIcon={<Save />}>Save and Exit</Button>
        </Fade>
      </Grid>
      <Grid item>
        <Fade in={isDirty} timeout={1500}>
          <Button variant='contained' endIcon={<DeleteForever />}>Cancel</Button>
        </Fade>
      </Grid>

    </Grid >
  )
}

export default EventController;

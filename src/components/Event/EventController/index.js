import { AccessTime, DeleteForever, Save, Share } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import { useState } from "react";
import { useFormState } from "react-hook-form";


export const EventController = ({ e, control }) => {
  const [edited, setEdited] = useState(false);
  const { isDirty, isSubmitted } = useFormState();

  return (
    <Grid container spacing={2} direction="column" wrap item alignItems='end' alignContent='end'>
      <Grid item sm={1}>
        <Button variant='outlined' endIcon={<AccessTime />}> Schedule Event </Button>
      </Grid>
      <Grid item sm={1}>
        <Button variant='outlined' endIcon={<Share />}> Copy Invite Link </Button>
      </Grid>
      {isDirty &&
        <>
          <Grid item sm={1} alignContent='end'>
            <Button type='submit' variant='contained' endIcon={<Save />}>Save and Exit</Button>
          </Grid>
          <Grid item sm={1}>
            <Button variant='contained' endIcon={<DeleteForever />}>Cancel</Button>
          </Grid>
        </>
      }
    </Grid >
  )
}

export default EventController;

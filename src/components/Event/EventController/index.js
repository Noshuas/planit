import { AccessTime, DeleteForever, Save, Share } from "@mui/icons-material";
import { Button, Fade, Grid } from "@mui/material";
import { useState } from "react";
import { useFormState } from "react-hook-form";
import { copyInviteLink } from "components/helpers";
import ScheduleModal from "./Scheduler";


export const EventController = ({ id, resetForm }) => {
  const { isDirty, isSubmitSuccessful } = useFormState();


  return (
    <Grid container spacing={2} direction="column" wrap item alignItems='end' alignContent='end'>
      <Grid item>
        <Button
          variant='outlined'
          endIcon={<AccessTime />}
        >
          Schedule Event
        </Button>
      </Grid>
      <Grid item>
        <Button variant='outlined'
          endIcon={<Share />}
          onClick={copyInviteLink(id)}
        >
          Copy Invite Link
        </Button>
      </Grid>
      <Grid item>
        <Fade in={isDirty} timeout={800}>
          <Button variant='contained'
            endIcon={<DeleteForever />}
            onClick={() => resetForm()}
          >
            Cancel
          </Button>
        </Fade>
      </Grid>
      <Grid item>
        <Fade in={isDirty} timeout={1500}>
          <Button
            type='submit'
            variant='contained'
            endIcon={<Save />}
          >
            Save
          </Button>
        </Fade>
      </Grid>
    </Grid >
  )
}

export default EventController;

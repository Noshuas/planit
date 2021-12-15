import {
  AccessTime, DeleteForever, Save, Share,
} from '@mui/icons-material';
import { Button, Fade, Grid } from '@mui/material';
import { useCallback, useState } from 'react';
import { useFormContext, useFormState } from 'react-hook-form';
import { copyInviteLink } from 'components/helpers';
import ScheduleModal from './ScheduleModal';

export var EventController = function ({
  id, resetForm, init, attendees,
}) {
  const { isDirty, isSubmitSuccessful } = useFormState();
  const [isOpen, setIsOpen] = useState(false);
  const timeFrame = useFormContext().getValues('time.timeFrame');
  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => setIsOpen(false), []);

  return (
    <Grid container spacing={2} direction="column" item alignItems="end" alignContent="end">
      {!init
        && (
        <>
          <Grid item>
            <Button
              variant="outlined"
              endIcon={<AccessTime />}
              onClick={handleOpen}
            >
              Schedule Event
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              endIcon={<Share />}
              onClick={copyInviteLink(id)}
            >
              Copy Invite Link
            </Button>
          </Grid>
        </>
        )}
      <Grid item>
        <Fade in={isDirty} timeout={800}>
          <Button
            variant="contained"
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
            type="submit"
            variant="contained"
            endIcon={<Save />}
          >
            Save
          </Button>
        </Fade>
      </Grid>
      <ScheduleModal open={isOpen} {...{ handleClose, attendees, timeFrame }} />
    </Grid>
  );
};

export default EventController;

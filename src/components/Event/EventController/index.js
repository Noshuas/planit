import {
  AccessTime, DeleteForever, Save, Share,
} from '@mui/icons-material';
import { Button, Fade, Grid, Stack } from '@mui/material';
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
    < Stack
      direction={{ md: 'column', sm: 'row', xs: 'row' }}
      spacing={{ md: 2, sm: 1, xs: 1 }}
      alignItems='flex-end'
      justifyContent='center'
      flexWrap='wrap'
      marginTop='1em'
    >
      {!init
        && (
          <>
            <div>
              <Button
                variant="outlined"
                endIcon={<AccessTime />}
                onClick={handleOpen}
              >
                Schedule Event
              </Button>
            </div>
            <div>
              <Button
                variant="outlined"
                endIcon={<Share />}
                onClick={copyInviteLink(id)}
              >
                Copy Invite Link
              </Button>
            </div>
          </>
        )}
      <Fade in={isDirty} timeout={800} mountOnEnter>
        <div>
          <Button
            variant="contained"
            endIcon={<DeleteForever />}
            onClick={() => resetForm()}
          >
            Cancel
          </Button>
        </div>
      </Fade>
      <Fade in={isDirty} timeout={1500} mountOnEnter>
        <div >
          <Button
            type="submit"
            variant="contained"
            endIcon={<Save />}
          >
            Save
          </Button>
        </div>
      </Fade>
      <ScheduleModal open={isOpen} {...{ handleClose, attendees, timeFrame }} />
    </Stack>
  );
};

export default EventController;

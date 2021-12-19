import AccessTime from '@mui/icons-material/AccessTime'
import DeleteForever from '@mui/icons-material/DeleteForever'
import Save from '@mui/icons-material/Save'
import Share from '@mui/icons-material/Share'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import Stack from '@mui/material/Stack'
import { copyInviteLink } from 'components/helpers';
import { useCallback, useState } from 'react';
import { useFormContext, useFormState } from 'react-hook-form';
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

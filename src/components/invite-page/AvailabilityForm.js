import { CalendarToday, ScheduleRounded } from "@mui/icons-material";
import { Button, Card, Stack } from "@mui/material";
import axios from "axios";
import ScheduleModal from "components/Event/EventController/ScheduleModal";
import Input from "components/Event/EventDetails/Input";
import { useCallback, useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";


export const AvailabilityForm = ({ timeFrame }) => {
  const methods = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const openModal = useCallback(() => setIsOpen(true));
  const closeModal = useCallback(() => setIsOpen(false));
  const submitAvail = useCallback(({ email, conflicts }) => {
    const body = {
      id: window.location.pathname.split('/').pop(),
      updateDocument: {
        $set: {
          'attendees.$[person]': {email, conflicts: conflicts}
        }
      },
      options: {
        arrayFilters: [{ 'person.email': email }],
        upsert: true
      }
    }

    axios.patch('/api/events', body)
      .then(console.log)
      .catch(console.log)
  })


  return (
    <Card sx={{ padding: '1em' }}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submitAvail)}>
          <Stack spacing={2}>

            <Input
              disabled={methods.formState.isSubmitSuccessful}
              name='email'
              label='Email'
              size='small'
              type='text'
              pattern={{ value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: 'A valid email must be provided' }}
              value=''
              required
            />
            <Button
              disabled={methods.formState.isSubmitSuccessful}
              variant='contained'
              onClick={openModal}
              endIcon={<CalendarToday />}
            >
              Add Availability
            </Button>
            <Button
              type='submit'
              disabled={methods.formState.isSubmitSuccessful}
              variant='contained'
            > RSVP </Button>
          </Stack>
          <ScheduleModal open={isOpen} handleClose={closeModal} {...{ timeFrame }} onInvitePage />
        </form>
      </FormProvider>
    </Card>
  )
}

export default AvailabilityForm;

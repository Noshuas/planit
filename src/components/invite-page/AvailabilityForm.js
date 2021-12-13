import { CalendarToday, ScheduleRounded } from "@mui/icons-material";
import { Button, Card, Stack } from "@mui/material";
import ScheduleModal from "components/Event/EventController/ScheduleModal";
import Input from "components/Event/EventDetails/Input";
import { useCallback, useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";


export const AvailabilityForm = ({ timeFrame }) => {
  const methods = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const openModal = useCallback(() => setIsOpen(true));
  const closeModal = useCallback(() => setIsOpen(false));
  const submitAvail = useCallback(({ email, availability }) => {
    console.log('todo: post formdata to the database', { email, conflicts: availability }, methods.formState)
  })

  return (
    <Card sx={{ padding: '1em' }}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submitAvail, (a, b, c) => console.log(a, b, c))}>
          <Stack spacing={2}>

            <Input
              disabled={methods.formState.isSubmitSuccessful}
              name='email'
              label='Email'
              size='small'
              type='text'
              pattern={{ value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: 'A valid email must be provided' }}
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
          <ScheduleModal open={isOpen} handleClose={closeModal} {...{ timeFrame }} />
        </form>
      </FormProvider>
    </Card>
  )
}

export default AvailabilityForm;

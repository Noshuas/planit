/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Grid } from '@mui/material';
import EventDetails from 'components/Event/EventDetails';
import Input from 'components/Event/EventDetails/Input';
import { PhotoBanner } from 'components/Event/PhotoBanner';
import { fetchEvents } from 'lib/database/controllers/events';
import { ObjectId } from 'mongodb';
import { getSession } from 'next-auth/react';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export const Event = ({ e }) => {

  const { info: {time, location, name, description, image, status}} = e;

  const methods = useForm({ mode: 'onChange'})
  const onSubmit = useCallback(test => console.log(test));
  console.log(methods.getValues());
  const watchUrl = methods.watch("url", false)
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Grid container justifyContent="center" columns={11} spacing={4}>
          {/* <Input name="test" label="test" /> */}
          <PhotoBanner url={watchUrl || e.info.image} />

          <EventDetails {...{time, status, location}}/>
          {/* <EventController /> */}
          {/* <EventDescription /> */}
        </Grid>
        <button type='submit'> Click me </button>
      </form>
    </FormProvider>
  )
}




export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (!session)
    return { redirect: './login' }


  const query = ObjectId(ctx.params.id.toString())
  let [event] = await fetchEvents(query)

  return { props: { e: event } }
}

export default Event;

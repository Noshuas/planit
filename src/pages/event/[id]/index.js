/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Card, Grid } from '@mui/material';
import EventContent from 'components/Event/EventContent';
import EventController from 'components/Event/EventController';
import EventDetails from 'components/Event/EventDetails';
import { PhotoBanner } from 'components/Event/PhotoBanner';
import { fetchEvents } from 'lib/database/controllers/events';
import { ObjectId } from 'mongodb';
import { getSession } from 'next-auth/react';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export const Event = ({ e }) => {

  const { info: { time, location, name, description, image, status } } = e;

  const methods = useForm({ mode: 'onChange' })
  const onSubmit = useCallback(test => console.log(test));
  console.log(methods.getValues());
  const watchUrl = methods.watch("url", false)
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Grid container justifyContent="center" columns={16} spacing={4}>
          <PhotoBanner url={watchUrl || e.info.image} />

          <Grid item container xs={4.1} spacing={2} direction="column" columns={12}>
            <Card sx={{padding: '3em'}}>
              <EventDetails {...{ time, status, location }} />
              </Card>
            <EventController />
          </Grid>

          <EventContent title={name} {...{ description }} />
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

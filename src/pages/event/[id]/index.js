/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Card, Dialog, DialogContent, DialogTitle, Grid } from '@mui/material';
import { Box } from '@mui/system';
import EventContent from 'components/Event/EventContent';
import EventController from 'components/Event/EventController';
import ScheduleModal from 'components/Event/EventController/Scheduler';
import EventDetails from 'components/Event/EventDetails';
import { PhotoBanner } from 'components/Event/PhotoBanner';
import { fetchEvents } from 'lib/database/controllers/events';
import { ObjectId } from 'mongodb';
import { getSession } from 'next-auth/react';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Script from 'next/script';

export const Event = ({ e }) => {

  const { info: { time, location, title, description, imageUrl, status } } = e;
  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      title,
      imageUrl,
      time: time,
      description,
      location
    }
  });


  const onSubmit = useCallback((test, e) => console.log(test));
  console.log(methods.getValues());
  const watchUrl = methods.watch("url", false)


  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Grid container columns={12} spacing={4} justifyContent='center'>
          <Grid item sm={12} md={8}>
            <PhotoBanner url={watchUrl || e.info.image} />
          </Grid>
          <Grid item container sm={12} md={8} columns={12} spacing={4}>
            <Grid item container xs={4} spacing={2} direction="column" >
              <Card sx={{ padding: '2em' }}>
                <EventDetails {...{ time, status, location }} />
              </Card>
              <EventController id={e._id}resetForm={methods.reset}/>
            </Grid>
            <Grid item spacing={2} xs={8} colums={1} container direction="column" >
              <Card sx={{ padding: '2em' }}>
                <EventContent title={title} {...{ description }} />
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  )
}




export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  const redirect = {
    destination: '/login',
    permanent: false,
  }

  const query = ObjectId(ctx.params.id.toString())
  let [event] = await fetchEvents(query)
  console.log(event, session)
  const props = { e: event, session }

  return (!session)
    ? { redirect }
    : { props }
}

export default Event;

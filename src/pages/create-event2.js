/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Card, Grid } from '@mui/material';
import EventContent from 'components/Event/EventContent';
import EventController from 'components/Event/EventController';
import EventDetails from 'components/Event/EventDetails';
import { PhotoBanner } from 'components/Event/PhotoBanner';
import { fetchEvents } from 'lib/database/controllers/events';
import { getSession } from 'next-auth/react';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export const Event = () => {
  const defaultImage = 'https://upload.wikimedia.org/wikipedia/commons/2/23/Mars_Wikivoyage_banner.jpg'
  const methods = useForm({ mode: 'onBlur',
  defaultValues: {
    // title: 'Event Title',
    // description: '',
    imageUrl: defaultImage,
    // location: 'Set Location',
    // duration: 0,
    // scheduled: '',
    timeFrame: [Date.now(), Date.now()],
  }
 });
  const onSubmit = useCallback((test, e) => console.log(test));


  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Grid container columns={12} spacing={4} justifyContent='center'>
          <Grid item sm={8} >
            <PhotoBanner url={defaultImage} />
          </Grid>
          <Grid item container sm={8} columns={12} spacing={4}>
            <Grid item container xs={4} spacing={2} direction="column" >
              <Card sx={{ padding: '3em' }}>
                <EventDetails />
              </Card>
              <EventController resetForm={methods.reset} init/>
            </Grid>
            <Grid item spacing={2} xs={8} colums={1} container direction="column" >
              <Card sx={{ padding: '3em' }}>
                <EventContent />
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  )
}




export async function getServerSideProps(context) {
  const session = await getSession(context)
  const props = { session }
  const redirect = {
    destination: '/login',
    permanent: false,
  }

  return (!session)
    ? { redirect }
    : { props }
}

export default Event;

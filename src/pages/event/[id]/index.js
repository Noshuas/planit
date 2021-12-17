/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Card, Container, Dialog, DialogContent, DialogTitle, Fade, Grid, Typography,
} from '@mui/material';
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
import axios from 'axios';
import { useRouter } from 'next/router';
import { getPhotoURL } from 'components/create-event/helpers';

export var Event = function ({ e }) {
  const {
    time, location, title, description, imageUrl, status,
  } = e.info;
  const router = useRouter();
  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      title,
      imageUrl,
      time,
      description,
      location,
    },
  });

  const onSubmit = (formData) => {
    getPhotoURL(formData.imageUrl, methods.setValue)
      .then(({ data }) => {
        formData.imageUrl = data;
        return axios.patch('/api/events', {
          id: e._id,
          updateDocument: {
            $set: {
              info: formData,
            },
          },
        })
      })
      .then(res => router.push('/home'))
      .catch(console.log)
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Container maxWidth="lg" >
          <Fade in={!methods.formState.isDirty} timeout={{enter: 3000, exit: 500}}>
            <Grid item margin='.75em'>
              <Typography textAlign='center'>Click on any field to start editing</Typography>
            </Grid>
          </Fade>
          <Grid container spacing={4} >
            <PhotoBanner url={imageUrl} />
            <Grid item container xs={12} md={4} direction="column" >
              <Card sx={{ padding: '2em' }}>
                <EventDetails {...{ time, status, location }} />
              </Card>
              <EventController id={e._id} resetForm={methods.reset} attendees={e.attendees} />
            </Grid>
            <Grid item xs={12} md={8} colums={1} container direction="column">
              <Card sx={{ padding: '2em' }}>
                <EventContent title={title} {...{ description }} />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </form>
    </FormProvider>
  );
};

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  const redirect = {
    destination: '/login',
    permanent: false,
  };

  const query = ObjectId(ctx.params.id.toString());
  const [event] = await fetchEvents(query);
  const props = { e: event, session };

  return (!session)
    ? { redirect }
    : { props };
}

export default Event;

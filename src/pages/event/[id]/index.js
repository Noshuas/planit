/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import Fade from '@mui/material/Fade'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import { getPhotoURL } from 'components/create-event/helpers'
import { EventContent, EventController, EventDetails, PhotoBanner } from 'components/Event/'
import LoadingSkeleton from 'components/LoadingSkeleton'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'


export const Event = function ({ id }) {
  const router = useRouter();
  const [event, setEvent] = useState(null);
  const session = useSession({ required: true, onUnauthenticated: signIn })
  const methods = useForm({ mode: 'onBlur' });

  useEffect(() => {
    axios.get('/api/events/' + id)
      .then(({ data }) => {
        methods.reset(data[0].info)
        setEvent(data[0])
      })
      .catch(console.log)
  }, [id, session.status, methods])

  if (session.status === 'loading' || !event)
    return <LoadingSkeleton />

  const { time, location, title, description, imageUrl, status } = event.info;


  const onSubmit = (formData) => {
    getPhotoURL(formData.imageUrl, methods.setValue)
      .then(({ data }) => {
        formData.imageUrl = data;
        return axios.patch('/api/events', {
          id: event._id,
          updateDocument: {
            $set: {
              info: formData,
            },
          },
        })
      })
      .then(() => router.push('/home'))
      .catch(console.log)
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Container maxWidth="lg" >
          <Fade in={!methods.formState.isDirty} timeout={{ enter: 3000, exit: 500 }}>
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
              <EventController id={event._id} resetForm={methods.reset} attendees={event.attendees} />
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

export async function getServerSideProps(context) {
  return { props: { id: context.params.id } };
}

export default Event;

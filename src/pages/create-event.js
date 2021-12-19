import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import Fade from '@mui/material/Fade'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import { getPhotoURL } from 'components/create-event/helpers'
import { EventContent, EventController, EventDetails, PhotoBanner } from 'components/Event'
import LoadingSkeleton from 'components/LoadingSkeleton'
import { signIn, useSession } from 'next-auth/react'
import router from 'next/router'
import { FormProvider, useForm } from 'react-hook-form'

export const CreateEvent = () => {
  const { data: { user: owner } = {}, status } = useSession({ required: true, onUnauthenticated: signIn });

  const defaultImage = 'https://upload.wikimedia.org/wikipedia/commons/2/23/Mars_Wikivoyage_banner.jpg';
  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      imageUrl: defaultImage,
      time: {
        timeFrame: [Date.now(), Date.now()],
      },
    },
  });

  const createNewEvent = async (e) => {
    e.preventDefault();
    const info = methods.getValues();
    const [start, end] = info.time.timeFrame;
    info.time.created = Date.now();

    info.time.timeFrame = (typeof start === 'number')
      ? [start, end]
      : [start.getTime(), end.setHours(23, 59, 59, 999)];

    getPhotoURL(info.imageUrl, methods.setValue)
      .then(({ data }) => {
        info.imageUrl = data;
        return axios.post('/api/events', { owner, info, attendees: [] });
      })
      .then(() => { router.push('/home') })
      .catch(console.log)
  };

  if (status === 'loading')
    return <LoadingSkeleton />

  return (
    <FormProvider {...methods}>
      <form onSubmit={createNewEvent}>
        <Container maxWidth='lg'>
          <Fade in={!methods.formState.isDirty} timeout={{ enter: 3000, exit: 500 }}>
            <Grid item margin='.75em'>
              <Typography textAlign='center'>Click on any field to start editing</Typography>
            </Grid>
          </Fade>
          <Grid container spacing={4} >
            <PhotoBanner url={defaultImage} />
            <Grid item container xs={12} md={4} direction="column" >
              <Card sx={{ padding: '2em' }}>
                <EventDetails />
              </Card>
              <EventController resetForm={methods.reset} init />
            </Grid>
            <Grid item xs={12} md={8} colums={1} container direction="column">
              <Card sx={{ padding: '2em' }}>
                <EventContent />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </form>
    </FormProvider>
  );
};

export default CreateEvent;

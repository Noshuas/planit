import { Card, Grid } from '@mui/material';
import { getPhotoURL } from 'components/create-event/helpers';
import EventContent from 'components/Event/EventContent';
import EventController from 'components/Event/EventController';
import EventDetails from 'components/Event/EventDetails';
import { PhotoBanner } from 'components/Event/PhotoBanner';
import { getSession, useSession } from 'next-auth/react';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import axios from 'axios'

export const CreateEvent = () => {
  const [posted, setPosted] = useState(false);
  const { data: session, status } = useSession();

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

  useEffect(() => {
    if (posted) router.push('/home');
  }, [posted]);

  const createNewEvent = async (e) => {
    e.preventDefault();
    const info = methods.getValues();
    const [start, end] = info.time.timeFrame;
    info.time.created = Date.now();

    info.time.timeFrame = (typeof start === 'number')
      ? [start, end]
      : [start.getTime(), end.setHours(23, 59, 59, 999)];

    const event = {
      owner: session.user,
      info,
      attendees: [],
    };
    getPhotoURL(info.imageUrl)
      .then(({ data }) => {
        event.info.imageUrl = data;
        return axios.post('/api/events', event);
      })
      .then(() => { setPosted(true); })
      .catch(console.log);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={createNewEvent}>
        <Grid container columns={12} spacing={4} justifyContent="center">
          <Grid item sm={8}>
            <PhotoBanner url={defaultImage} />
          </Grid>
          <Grid item container sm={8} columns={12} spacing={4}>
            <Grid item container xs={5} spacing={2} direction="column">
              <Card sx={{ padding: '3em' }}>
                <EventDetails />
              </Card>
              <EventController resetForm={methods.reset} init />
            </Grid>
            <Grid item spacing={2} xs={7} colums={1} container direction="column">
              <Card sx={{ padding: '3em', minHeight: '1' }}>
                <EventContent />
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const props = { session };
  const redirect = {
    destination: '/login',
    permanent: false,
  };

  return (!session)
    ? { redirect }
    : { props };
}

export default CreateEvent;

import { Card, Grid } from '@mui/material';
import EventContent from 'components/Event/EventContent';
import EventController from 'components/Event/EventController';
import EventDetails from 'components/Event/EventDetails';
import { PhotoBanner } from 'components/Event/PhotoBanner';
import { getSession, useSession } from 'next-auth/react';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export const createEvent = () => {
  const defaultImage = 'https://upload.wikimedia.org/wikipedia/commons/2/23/Mars_Wikivoyage_banner.jpg'
  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      imageUrl: defaultImage,
      time: {
        timeFrame: [Date.now(), Date.now()],
      }
    }
  });


  const onSubmit = useCallback((test, e) => console.log(test));

  const { data: session, status } = useSession();

  const createNewEvent = async (e) => {
    e.preventDefault();
    const owner = session.user;
    const info = methods.getValues()

    info.time.created = Date.now();
    const [start, end] = info.time.timeFrame;
    info.time.timeFrame = [start.getTime(), end.setHours(23,59,59,999)]

    getPhotoURL(info.photoUrl, (photoUrl) => {
      info.photoUrl = photoUrl;
      postEvent(session.user.email, {owner, info}, setConfirmed);
    });
  };




  return (
    <FormProvider {...methods}>
      <form onSubmit={createNewEvent}>
        <Grid container columns={12} spacing={4} justifyContent='center'>
          <Grid item sm={8} >
            <PhotoBanner url={defaultImage} />
          </Grid>
          <Grid item container sm={8} columns={12} spacing={4}>
            <Grid item container xs={4} spacing={2} direction="column" >
              <Card sx={{ padding: '3em' }}>
                <EventDetails />
              </Card>
              <EventController resetForm={methods.reset} init />
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

export default createEvent;

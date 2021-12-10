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
  const onSubmit = useCallback((test, e) => console.log(e));
  console.log(methods.getValues());
  const watchUrl = methods.watch("url", false)
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Grid container columns={12} spacing={4} justifyContent='center'>

          <Grid item sm={8} >
            <PhotoBanner url={watchUrl || e.info.image} />
          </Grid>

          <Grid item container sm={8} columns={12} spacing={4}>

            <Grid item container xs={4} spacing={2} direction="column" >
              <Card sx={{ padding: '3em' }}>
                <EventDetails {...{ time, status, location }} />
              </Card>
              <EventController />
            </Grid>

            <Grid item spacing={2} xs={8} colums={1} container direction="column" >
              <Card sx={{ padding: '3em' }}>
                <EventContent title={name} {...{ description }} />
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
  if (!session)
    return { redirect: './login' }


  const query = ObjectId(ctx.params.id.toString())
  let [event] = await fetchEvents(query)

  return { props: { e: event } }
}

export default Event;

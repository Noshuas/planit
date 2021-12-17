import { Card, Container, Grid, Typography } from '@mui/material';
import { fetchEvents } from 'lib/database/controllers/events';
import { ObjectId } from 'mongodb';
import { getSession } from 'next-auth/react';
import Image from 'next/image';
import { EventHeader } from 'components/invite-page/EventHeader';
import { EventDescription } from 'components/invite-page/EventDescription';
import { AvailabilityForm } from 'components/invite-page/AvailabilityForm';

export var InvitePage = function ({ e }) {
  const { name } = e.owner;
  const {
    imageUrl, title, time, location, description,
  } = e.info;

  return (
    <Container maxWidth='lg'>
      <Grid container justifyContent="center" spacing={2} sx={{marginTop: '2em'}}>
        <Grid item xs={12}>
          <Card style={{ overflow: 'hidden', position: 'relative', minHeight: 144, width: '100%' }}>
            <Image
              priority
              src={imageUrl}
              layout="fill"
              alt="event-image"
              objectFit="cover"
            />
          </Card>
        </Grid>
        <Grid item xs={12}  md={8} container direction="column" wrap="nowrap" spacing={2}>
          <Grid item>
            <EventHeader
              message={`You've been invited to ${name.split(' ')[0]}'s event!`}
              {...{ location, time, title }}
            />
          </Grid>
          <Grid item>
            <EventDescription {...{ description }} />
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <AvailabilityForm timeFrame={time.timeFrame} />
        </Grid>
      </Grid>
    </Container >
  );
};

export async function getServerSideProps(context) {
  const query = ObjectId(context.params.id.toString());
  const [event] = await fetchEvents(query);
  return { props: { e: event } };
}

export default InvitePage;

import { Card, Grid, Typography } from '@mui/material';
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
    <Grid container justifyContent="center" spacing={2}>
      <Grid item sm={8}>
        <Card>
          <Image
            priority
            src={imageUrl}
            layout="responsive"
            height={144}
            width={1050}
            alt="event-image"
            objectFit="cover"
          />
        </Card>
      </Grid>
      <Grid item sm={6} container direction="column" wrap="nowrap" spacing={2}>
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
      <Grid item sm={2}>
        <AvailabilityForm timeFrame={time.timeFrame} />
      </Grid>
    </Grid>
  );
};

export async function getServerSideProps(context) {
  const query = ObjectId(context.params.id.toString());
  const [event] = await fetchEvents(query);
  return { props: { e: event } };
}

export default InvitePage;

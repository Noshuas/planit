import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { AvailabilityForm, EventDescription, EventHeader } from 'components/invite-page/';
import { fetchEvents } from 'lib/database/controllers/events';
import { ObjectId } from 'mongodb';
import Image from 'next/image';


export const InvitePage = function ({ e }) {
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

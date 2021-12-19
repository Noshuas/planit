import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { AvailabilityForm, EventDescription, EventHeader } from 'components/invite-page/';
import LoadingSkeleton from 'components/LoadingSkeleton';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';


export const InvitePage = function ({ id }) {
  const [event, setEvent] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    axios.get('/api/events/' + id)
      .then(({ data }) => {
        setEvent(data[0])
      })
      .catch(console.log)
  }, [id])

  if (!event)
    return <LoadingSkeleton />

  const { name } = event.owner;
  const { imageUrl, title, time, location, description } = event.info;

  return (
    <Container maxWidth='lg'>
      <Grid container justifyContent="center" spacing={2} sx={{ marginTop: '2em' }}>
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
        <Grid item xs={12} md={8} container direction="column" wrap="nowrap" spacing={2}>
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
          <AvailabilityForm timeFrame={time.timeFrame} email={session?.user?.email}/>
        </Grid>
      </Grid>
    </Container >
  );
};

export async function getServerSideProps(context) {
  return { props: { id: context.params.id } };
}


export default InvitePage;

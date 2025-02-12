import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import LoadingSkeleton from 'components/LoadingSkeleton';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Event from '../components/home/Event';

export const Home = function (props) {
  const [events, setEvents] = useState();
  const [displayedEvents, setDisplayed] = useState();
  const { data: session, status } = useSession({required: true, onUnauthenticated: signIn});

  useEffect(() => {
    if (status === 'authenticated')
      axios.post(`/api/events/`, { email: session.user.email })
        .then(({ data }) => {
          setEvents(data);
          setDisplayed(data);
        })
        .catch(console.log);
  }, [status, session]);


  if (status === 'loading')
    return <LoadingSkeleton />

  const removeEvent = (i) => {
    const newEvents = events.slice()
    newEvents.splice(i, 1);

    setEvents(newEvents);
    setDisplayed(newEvents);
  }

  const search = (e) => {
    const query = e.target.value;
    const newDisplayed = events.filter((result) => result.info.title.includes(query));
    setDisplayed(newDisplayed);
  };

  return (
    <Grid container direction="row" justifyContent="center" spacing={4} alignItems="center" sx={{ marginTop: '2em' }}>
      <Grid item xs={8} md={6}>
        <TextField
          margin="dense"
          id="search-bar"
          label="Filter Events"
          variant="outlined"
          onChange={search}
          fullWidth
        />
      </Grid>
      {displayedEvents?.length
        ?
        displayedEvents.map((event, i) => (
          <Grid item key={Math.random()} xs={11} md={8}>
            <Event {...event} key={event._id} {...{ removeEvent, i }} />
          </Grid>
        )).reverse()
        :
        <Grid item sm={12}>
          <Typography textAlign={'center'} >Click &quot;Create Event&quot; in the toolbar to get started</Typography>
        </Grid>
      }
    </Grid>
  );
};

export default Home;

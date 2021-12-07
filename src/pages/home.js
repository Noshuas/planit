import React, { useContext, useEffect, useState } from 'react';
import { TextField, Grid } from '@mui/material';
import axios from 'axios';
import Event from '../components/home/Event';
import { useSession, getSession } from 'next-auth/react';

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

export const Home = (props) => {
  const [events, setEvents] = useState();
  const [displayedEvents, setDisplayed] = useState();
  const { data: session, status } = useSession();

  useEffect(() => {
    axios.get(`/api/events/${session.user.email}`)
      .then(({ data }) => {
        console.log(data);
        setEvents(data);
        setDisplayed(data);
      })
      .catch(console.log);
  }, [status, session]);

  const search = (e) => {
    if (e.key === 'Enter') {
      const query = e.target.value;
      const newDisplayed = events.filter((result) => result.event.name.includes(query));
      setDisplayed(newDisplayed);
    }
  };

  return (
    <Grid container direction="column" alignItems="center" spacing={6}>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="row"
      >
        <Grid item xs={2}>
          <TextField
            margin="dense"
            id="search-bar"
            label="Search"
            variant="outlined"
            onKeyUp={search}
          />
        </Grid>
      </Grid>
      {displayedEvents && displayedEvents.map((event) => (
        <Grid item key={Math.random()} xs={6}>
          <Event {...event} />
        </Grid>
      )).reverse()}
    </Grid>
  );
};

export default Home;

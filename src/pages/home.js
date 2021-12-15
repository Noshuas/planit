import React, { useContext, useEffect, useState } from 'react';
import { TextField, Grid } from '@mui/material';
import axios from 'axios';
import { useSession, getSession } from 'next-auth/react';
import Event from '../components/home/Event';

export var Home = function (props) {
  const [events, setEvents] = useState();
  const [displayedEvents, setDisplayed] = useState();
  const { data: session, status } = useSession();

  useEffect(() => {
    axios.get(`/api/events/${session.user.email}`)
      .then(({ data }) => {
        setEvents(data);
        setDisplayed(data);
      })
      .catch(console.log);
  }, [session.user.email]);

  const search = (e) => {
    const query = e.target.value;
    const newDisplayed = events.filter((result) => result.info.title.includes(query));
    setDisplayed(newDisplayed);
  };

  return (
    <Grid container direction="row" justifyContent="center" spacing={4} alignItems="center">
      <Grid item xs={6}>
        <TextField
          margin="dense"
          id="search-bar"
          label="Search"
          variant="outlined"
          onChange={search}
          fullWidth
        />
      </Grid>
      {displayedEvents && displayedEvents.map((event) => (
        <Grid item key={Math.random()} xs={8}>
          <Event {...event} />
        </Grid>
      )).reverse()}
    </Grid>
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

export default Home;

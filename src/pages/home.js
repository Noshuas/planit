import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { TextField, Grid } from '@mui/material';
import axios from 'axios';
import Event from '../components/home/Event';
import { useSession, getSession } from 'next-auth/react';


export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context)
    }
  }
}

const Home = (props) => {
  let [events, setEvents] = useState();
  const { data: session, status } = useSession();
  const authenticated = status === 'authenticated';
  const loading = status === 'loading';

  useEffect(() => {
    if (!authenticated) return;

    const { email } = session.user;
    axios.get(`/api/events/${email}`)
      .then(({ data }) => setEvents(data))
      .catch(console.log);
  }, [status])

  const search = (e) => {
    if (e.key === 'Enter') {
      const query = document.getElementById('search-bar').value;
      const newDisplayed = state.events.filter((event) => event.name.indexOf(query) >= 0);
      setState({
        ...state,
        displayedEvents: newDisplayed,
      });
    }
  };

  return (loading)
    ? <h1>Loading...</h1>
    : (!authenticated)
      ? useRouter().push('/login')
      : (
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
          {events.map((event) => (
            <Grid item key={Math.random()} xs={6}>
              <Event {...event} />
            </Grid>
          )).reverse()}
        </Grid>
      );
};

export default Home;

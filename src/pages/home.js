import React, { useContext, useEffect, useState } from 'react';
import { TextField, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import axios from 'axios';
// import Link from 'next/link';
import Event from '../components/home/Event';
import Account from '../components/accountContext';
import { useSession, getSession } from 'next-auth/react';

const useStyles = makeStyles({
  root: {
    marginRight: '1rem',
    width: '100%',
  },
  gridHeader: {
    width: '100%',
  },
  button: {
    marginLeft: '1em',
  },

});

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context)
    }
  }
}

const Home = (props) => {
  let [ events, setEvents ] = useState();
  const { data: session, status } = useSession();
  const authenticated = status === 'authenticated';
  console.log(events, 'events');

  useEffect(()=>{
    if (!authenticated) return;

    const { email } = session.user;

    axios.get(`/api/events/${email}`)
      .then(({ data })=> setEvents(data))
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

  if (!events) return <h1>Loading</h1>



  return (
    <Grid container direction="column" alignItems="center" spacing={6}>
      <Grid
        container
        // className={classes.gridHeader}
        alignItems="center"
        justifyContent="center"
        direction="row"
      >
        <Grid item xs={2}>
          <TextField
            margin="dense"
            // className={classes.root}
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

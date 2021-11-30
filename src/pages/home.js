import React, { useContext, useEffect, useState } from 'react';
import {
  TextField, Grid, makeStyles,
} from '@material-ui/core';
import axios from 'axios';
// import Link from 'next/link';

import Event from '../components/Event';
import Account from '../accountContext';

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

const Home = () => {
  const classes = useStyles();
  const { name, loggedIn, update } = useContext(Account);
  const [state, setState] = useState({
    initialized: false,
    events: [],
    displayedEvents: [],
  });

  useEffect(() => {
    if (typeof update === 'function') {
      update();
    }
    if (!state.initialized && loggedIn) {
      const data = {
        options: {
          count: 20,
          where: {
            property: 'owner',
            value: name,
          },
        },
      };

      const config = {
        method: 'get',
        url: '/api/events',
        headers: {
          'Content-Type': 'application/json',
        },
        params: data,
      };

      axios(config)
        .then((res) => res.data)
        .then((events) => {
          setState({
            initialized: true,
            events,
            displayedEvents: events,
          });
        });
    }
  }, [loggedIn, name, update, state.initialized]);

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

  return (
    <Grid container direction="column" alignItems="center" spacing={6}>
      <Grid
        container
        className={classes.gridHeader}
        alignItems="center"
        justifyContent="center"
        direction="row"
      >
        <Grid item xs={2}>
          <TextField
            margin="dense"
            className={classes.root}
            id="search-bar"
            label="Search"
            variant="outlined"
            onKeyUp={search}
          />
        </Grid>
      </Grid>
      {state.displayedEvents.map((event) => (
        <Grid item key={Math.random()} xs={6}>
          <Event {...event} />
        </Grid>
      )).reverse()}
    </Grid>
  );
};

export default Home;

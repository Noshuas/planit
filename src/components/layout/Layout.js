/* eslint-disable @next/next/link-passhref */
import React, { useState, useEffect } from 'react';
import Cookie from 'js-cookie';
import makeStyles from '@mui/styles/makeStyles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import { SvgIcon } from '@mui/icons-material';
import { useRouter } from 'next/router';
import Link from 'next/link';
// import PlanitIcon from './PlanitIcon';
import ColorPicker from './ColorPicker';

import Account from '../accountContext';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    // marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer',
    userSelect: 'none',
  },
}));

// eslint-disable-next-line react/function-component-definition
export default function ButtonAppBar({ children }) {
  const router = useRouter();
  const classes = useStyles();
  const [cookie, setCookie] = useState({ loggedIn: false });

  // on page render, set cookie state
  useEffect(() => {
    const updateCookies = () => {
      setCookie({
        name: Cookie.get('name'),
        email: Cookie.get('email'),
        loggedIn: Cookie.get('logged-in') === 'true',
        update: updateCookies,
      });
    };
    if (cookie.update === undefined) { updateCookies(); }
  }, [cookie]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <ColorPicker />
          <Typography variant="h3" className={classes.title} onClick={() => { router.push('/home'); }}>
            P L A N . I T
          </Typography>
          {cookie.loggedIn && <Button color="inherit"><Link href="/create-event">Create Event</Link></Button>}
          {cookie.loggedIn && <Button color="inherit"><Link href="/logout">Logout</Link></Button>}
        </Toolbar>
      </AppBar>
      <br />
      <br />
      <br />
      <Account.Provider value={cookie}>
        {children}
      </Account.Provider>
    </div>
  );
}

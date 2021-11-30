/* eslint-disable @next/next/link-passhref */
import React, { useState, useEffect } from 'react';
import Cookie from 'js-cookie';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import { SvgIcon } from '@material-ui/icons';
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

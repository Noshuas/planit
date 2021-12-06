/* eslint-disable @next/next/link-passhref */
import React, { useState, useEffect } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useRouter } from 'next/router';
import Link from 'next/link';
// import ColorPicker from './ColorPicker';
import { useSession, signOut } from 'next-auth/react';

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
  const router = useRouter()
  const classes = useStyles();
  const { data: session, status } = useSession();
  const authenticated = status === 'authenticated'

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <ColorPicker /> */}
          <Typography variant="h3" className={classes.title} onClick={() => { router.push('/home'); }}>
            P L A N . I T
          </Typography>
          {authenticated && <Button color="inherit"><Link href="/create-event">Create Event</Link></Button>}
          {authenticated && <Button color="inherit" onClick={signOut}>Logout</Button>}
          {authenticated && <Avatar src={session.user.image} />}
        </Toolbar>
      </AppBar>
      <br />
      <br />
      <br />
      {children}
    </div>
  );
}

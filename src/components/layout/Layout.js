/* eslint-disable @next/next/link-passhref */
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
  const { data: session, status } = useSession();
  const authenticated = status === 'authenticated';

  return (
    <div className={classes.root}>
      <AppBar position="sticky" >
        <Toolbar>
          {/* <ColorPicker /> */}
          <Typography variant='h4' component='h1' className={classes.title} onClick={() => { router.push('/home'); }}>
            PLAN.IT
          </Typography>
          {authenticated && <Button color="inherit"><Link href="/create-event">Create Event</Link></Button>}
          {authenticated && <Button color="inherit" onClick={signOut}>Logout</Button>}
          {authenticated && <Avatar src={session.user.image} alt='user profile photo'/>}
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
}

import { Google } from '@mui/icons-material';
import { Button, Container, Typography } from '@mui/material';
import { getProviders, signIn } from 'next-auth/react';
import React from 'react';
import { getSession } from 'next-auth/react';
import { LoginLayout, LoginNav, LoginForm } from '../components/login';

const Login = function () {
  return (
    <>
      <Container>
        <Typography variant="h1" sx={{ fontSize: '7em' }}>Hello, World!</Typography>
        <Typography variant="h2" gutterBottom >Welcome to Plan.it</Typography>

        <Button
          variant='contained'
          size='large'
          onClick={() => signIn('google', { callbackUrl: `${window.location.origin}/home` })}
          endIcon={<Google />}
        >
          Sign in
        </Button>
        <Container sx={{ paddingTop: '4em' }}>
          <Typography variant='h4' paragraph>
            Thanks for taking the time to check out this handly scheduling app I've made!
          </Typography>
          <Typography variant='h6' paragraph>
            <strong>Planit is a web app designed to make scheduling events around many busy schedules easier. </strong>If you have
            a time frame in mind for when you'ld like to organize an event, but figuring out <a>when is good</a> amidst Arden's college classes,
            Maya's work schedule, Brooke's hiking trip, etc. is becoming a beast of burden, let us help you out.
          </Typography>
          <Typography variant='h6' paragraph>
            The interactive tutorial is on it's way, but to start:
            <ul>
            <li> Login with a Google Account </li>

               <li> Create an event with the following information: </li>
             <ul>
            <li> Name </li>
            <li> Description </li>
            <li> Time Frame </li>
            <li> Duration </li>
            <li> Location </li>
            <li> Share the invite link with the prospective attendees </li>
               </ul>
            </ul>
            As they fill out their own availiblity (they can import their own Google Calendar as well), you'll be able to see a visual
            breakdown of what time will work best for everyone.
            Do <em>less</em> planning. <strong> Have more fun.</strong>
          </Typography>
        </Container>
      </Container>
    </>
  );
};

export default Login;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/home',
      },
    };
  }

  return {
    props: {
      providers: await getProviders(),
      session,
    },
  };
}

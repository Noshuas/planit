import { Google } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LoadingSkeleton from 'components/LoadingSkeleton';
import { getProviders, signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Login = function () {
  const router = useRouter()
  const { status } = useSession();

  if (status === 'loading')
    return <LoadingSkeleton />

  return (
    <Container>
      <Typography variant="h1" sx={{ fontSize: '7em' }}>Hello, World!</Typography>
      <Typography variant="h2" gutterBottom >Welcome to Plan.it</Typography>

      <Button
        variant='contained'
        size='large'
        onClick={() => signIn('google', { callbackUrl: window.location.orign +'/home' })}
        endIcon={<Google />}
      >
        Sign in
      </Button>
      <Container sx={{ paddingTop: '4em' }}>
        <Typography variant='h4' paragraph>
          Thanks for taking the time to check out this handly scheduling app I&apos;ve made!
        </Typography>
        <Typography variant='h6' paragraph>
          <strong>Planit is a web app designed to make scheduling events around many busy schedules easier. </strong>If you have
          a time frame in mind for when you&apos;d like to organize an event, but figuring out <a>when is good</a> amidst Arden&apos;s college classes,
          Maya&apos;s work schedule, Brooke&apos;s hiking trip, etc. is becoming a beast of burden, let us help you out.
        </Typography>
        <Typography variant='h6' >
          The interactive tutorial is on it&apos;s way, but to start:
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
          As they fill out their own availiblity (they can import their own Google Calendar as well), you&apos;ll be able to see a visual
          breakdown of what time will work best for everyone.
          Do <em>less</em> planning. <strong> Have more fun.</strong>
        </Typography>
      </Container>
    </Container>
  );
};
Login.signIn = true;

export default Login;


export async function getServerSideProps(context) {
  return {
    props: {
      providers: await getProviders(),
    },
  };
}

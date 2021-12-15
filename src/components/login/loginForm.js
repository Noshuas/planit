import { Google } from '@mui/icons-material';
import { Button } from '@mui/material';
import { getProviders, signIn } from 'next-auth/react';

export var LoginForm = function ({ providers }) {
  return (
      <Button
        onClick={() => signIn('google', { callbackUrl: `${window.location.origin}/home` })}
        endIcon={<Google />}
      >
        Sign in
      </Button>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      providers: await getProviders(),
      session,
    },
  };
}

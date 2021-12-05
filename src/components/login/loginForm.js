import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';
import { getProviders, signIn } from "next-auth/react"

const LoginForm = ( { providers }) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleChange = (setStateFunc) => (e) => {
    setStateFunc(e.currentTarget.value);
  };

  const submitLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      setIsLoggingIn(true);
      axios.post('/login', { email, password })
        .then((data) => {
          if (data.status === 200) {
            // update();
            router.push('/home');
          } else {
            console.log('ERROR TOOLTIP WITH:', data.message);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsLoggingIn(false);
        });
    } else {
      // TODO: logic for when login input is invalid
    }
  };

  return (
    // <form noValidate autoComplete="off">
    //   <TextField
    //     variant="outlined"
    //     autoFocus
    //     required
    //     type="email"
    //     id="email"
    //     name="email"
    //     label="Email"
    //     value={email}
    //     onChange={handleChange(setEmail)}
    //   />
    //   <TextField
    //     variant="outlined"
    //     required
    //     type="password"
    //     id="password"
    //     name="password"
    //     label="Password"
    //     value={password}
    //     onChange={handleChange(setPassword)}
    //   />
    //   <Button
    //     variant="contained"
    //     color="primary"
    //     onClick={submitLogin}
    //     disabled={isLoggingIn}
    //   >
    //     {isLoggingIn ? 'Logging in...' : 'Log in'}
    //   </Button>
    // </form>
    <>
      <button onClick={() => signIn("google", { callbackUrl: `${window.location.origin}/home` })}>Sign in</button>
      <button onClick={() => signIn()}>Sign in without redirect</button>

    </>
  );
};

export default LoginForm;

export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}

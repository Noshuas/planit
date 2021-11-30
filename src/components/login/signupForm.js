import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import axios from 'axios';
import { useRouter } from 'next/router';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isProcessingSignup, setIsProcesseingSignup] = useState(false);
  const router = useRouter();

  const handleChange = (setStateFunc) => (e) => {
    setStateFunc(e.currentTarget.value);
  };

  const createAccount = (e) => {
    e.preventDefault();
    if (email && password && name) {
      setIsProcesseingSignup(true);
      // Submit user credentials to create account
      axios.post('/signup', { email, name, password })
        .then((res) => {
          if (res.status === 200) {
            // immediately log the use in
            axios.post('/login', { email, password })
              .then((login) => {
                if (login.status === 200) {
                  router.push('/home');
                }
              });
          }
        })
        .catch((err) => {
          console.log('Registration failed:', err);
          setIsProcesseingSignup(false);
        });
    } else {
      console.log('FIELD VALIDATION FAILED');
    }
  };

  return (
    <form noValidate autoComplete="off">
      <TextField
        variant="outlined"
        autoFocus
        required
        type="email"
        id="email"
        name="email"
        label="Email"
        value={email}
        onChange={handleChange(setEmail)}
      />
      <TextField
        variant="outlined"
        required
        type="password"
        id="password"
        name="password"
        label="Password"
        value={password}
        onChange={handleChange(setPassword)}
      />
      <TextField
        variant="outlined"
        required
        type="name"
        id="name"
        name="name"
        label="Name"
        value={name}
        onChange={handleChange(setName)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={createAccount}
        disabled={isProcessingSignup}
      >
        {isProcessingSignup ? 'Creating account...' : 'Create account'}
      </Button>
    </form>
  );
};

export default SignupForm;

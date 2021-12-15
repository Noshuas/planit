import React from 'react';
import { LoginLayout, LoginNav, SignupForm } from '../components/login';

const Signup = function () {
  return (
    <LoginLayout>
      <LoginNav currentPage="/signup" />
      <SignupForm />
    </LoginLayout>
  );
};

export default Signup;

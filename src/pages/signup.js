import React from 'react';
import LoginLayout from '../components/login/loginLayout';
import LoginNav from '../components/login/loginNav';
import SignupForm from '../components/login/signupForm';

const Signup = () => (
  <LoginLayout>
    <LoginNav currentPage="/signup" />
    <SignupForm />
  </LoginLayout>
);

export default Signup;

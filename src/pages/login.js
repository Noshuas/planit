import React from 'react';
import LoginLayout from '../components/login/loginLayout';
import LoginNav from '../components/login/loginNav';
import LoginForm from '../components/login/loginForm';

const Login = () => (
  <LoginLayout>
    <LoginNav currentPage="/login" />
    <LoginForm />
  </LoginLayout>
);

export default Login;

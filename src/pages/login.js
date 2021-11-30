import React from 'react';
import { LoginLayout, LoginNav, LoginForm } from '../components/login';

const Login = () => (
  <LoginLayout>
    <LoginNav currentPage="/login" />
    <LoginForm />
  </LoginLayout>
);

export default Login;

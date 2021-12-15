import React from 'react';
import { getSession } from 'next-auth/react';
import { LoginLayout, LoginNav, LoginForm } from '../components/login';

const Login = function () {
  return (
    <LoginLayout>
      <LoginNav currentPage="/login" />
      <LoginForm />
    </LoginLayout>
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
      session,
    },
  };
}

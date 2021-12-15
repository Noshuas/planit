import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import '../styles/globals.css';
import React from 'react';
import Head from 'next/head';

import CssBaseline from '@mui/material/CssBaseline';
import { SessionProvider } from 'next-auth/react';
import Layout from '../components/layout/Layout';

const MyApp = function ({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <SessionProvider session={session}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>

    </>
  );
};

export default MyApp;

import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
// import '@fullcalendar/interaction/main.css'
// import '@fullcalendar/react/main.css'
import '../styles/globals.css';
import React from 'react';
import Head from 'next/head';

import CssBaseline from '@material-ui/core/CssBaseline';
import Layout from '../components/layout/Layout';
// import Account from '../accountContext';
import CustomThemeProvider from '../components/themes/CustomThemeProvider';

export default function MyApp(props) {
  const { Component, pageProps } = props;
  // const { name } = useContext(Account);

  return (
    <>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <CustomThemeProvider>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CustomThemeProvider>

    </>
  );
}

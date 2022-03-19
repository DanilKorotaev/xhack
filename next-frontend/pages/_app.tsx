import React from 'react';
import { ThemeProvider } from 'styled-components';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { AppContextProvider } from '../src/AppContext';
import { apiHttpClient } from '../src/modules/common/services/httpService/httpClient';
import {GlobalStyles} from "../src/components/globalStyles";
import {IUser} from "../src/models/User";
import {pages} from "../src/pages";
import {CookieService} from "../src/modules/common/services/cookieService/CookieService";

export const theme = {
  navbarHeight: 40,
  colors: {
    primary: '#0070f3',
  },
};

const App: React.FC<AppProps & { props: { user: null | any } }> & { getInitialProps: any } = (appProps) => {
  const { Component, pageProps, props } = appProps;
  return (
    <>
      <AppContextProvider serverSideProps={props}>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
          <link rel="shortcut icon" href={require('../assets/logo.svg')} type="image/svg" />
          <title>xHack.dev</title>
        </Head>
        <GlobalStyles />
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </AppContextProvider>
    </>
  );
};

App.getInitialProps = async (context) => {
  const user: IUser | null = await (async () => {
    try {
      const cookie = context.ctx.req.headers.cookie;
      const token = CookieService.getCookie('token', cookie);
      if (!token) {
        return null;
      }
      return (await apiHttpClient.get<IUser>('/users/profile', {
        headers: {
          authorization: `Bearer ${cookie.token}`,
        }
      })).data;
    } catch (error) {
      console.log(error);
      return null;
    }
  })();
  if (context.Component.protected && !user) {
    context.ctx.res.writeHead(302, { Location: pages.auth() });
    context.ctx.res.end();
  }
  return {
    props: {
      user,
    },
  };
};

export default App;

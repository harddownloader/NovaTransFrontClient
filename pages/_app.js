import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import App from 'next/app'
import './about/test.css'
import '@/styles/style.scss'

// const theme = createTheme();

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
  // return (
  //   <ThemeProvider theme={theme}>
  //     <Component {...pageProps} />
  //   </ThemeProvider>
  // );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp

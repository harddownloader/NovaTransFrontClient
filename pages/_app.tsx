import React from 'react'
import { styled, ThemeProvider } from '@mui/styles'
import { createTheme } from '@mui/material/styles'
// import App from 'next/app'
import { Provider } from 'react-redux'
import  { AppProps } from 'next/app'
import './about/test.css'
import '@/styles/global.scss'
import store from '../app/store'

const theme = createTheme()


export default function MyApp({ Component, pageProps }: AppProps) {
  return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
  )
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



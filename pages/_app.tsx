import React, { ReactElement, ReactNode } from 'react'
import { NextPage } from "next"
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

// mui
import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme
} from '@mui/material/styles'

// assets
import '@/styles/global.scss'

// store
import store from '@/store/store'

const theme = createTheme()

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page)

  /*
  * <StyledEngineProvider injectFirst>
  * https://github.com/vercel/next.js/discussions/32565
  * */
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          {getLayout(<Component {...pageProps} />)}
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}


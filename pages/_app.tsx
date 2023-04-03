import React, { ReactElement, ReactNode } from 'react'
import { NextPage } from "next"
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

// mui
import { styled, ThemeProvider } from '@mui/styles'
import { createTheme } from '@mui/material/styles'

// assets
import '@/styles/global.scss'

// store
import store from '../app/store'

const theme = createTheme()

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page)

  return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          {getLayout(<Component {...pageProps} />)}
        </Provider>
      </ThemeProvider>
  )
}


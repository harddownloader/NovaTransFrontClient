import React from "react"
import Document, {
  Html,
  Head,
  Main,
  NextScript
} from "next/document"

// mui
import { ServerStyleSheets } from '@mui/styles'
import { createTheme, responsiveFontSizes } from "@mui/material/styles"

const theme = responsiveFontSizes(createTheme())

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          /> */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <script type="text/javascript" src="/static/script.js" />
          <link rel="stylesheet" href="/static/css/main.css" />

          {/* favicons */}
          <link rel="apple-touch-icon" sizes="180x180" href="/static/img/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/img/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/img/favicon/favicon-16x16.png" />
          <link rel="manifest" href="/static/img/favicon/site.webmanifest" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx) => {
  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () => originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      <React.Fragment key="styles">
        {initialProps.styles}
        {sheets.getStyleElement()}
      </React.Fragment>,
    ],
  }
}

export default MyDocument

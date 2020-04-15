import Document, {
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'

import * as Sentry from '@sentry/browser'
Sentry.init({dsn: "https://6199b466b9424e1d90ce51afb81d9158@sentry.io/5178018"})

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta
            name='viewport'
            content='initial-scale=1.0, width=device-width'
          />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/icon?family=Material+Icons'
          />
          <link rel='icon' type='image/png' href='/static/favicon.ico' />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script async src='https://cdn.reamaze.com/assets/reamaze.js' />
          <script src='/static/js/reamaze.js' />
        </body>
      </Html>
    )
  }
}

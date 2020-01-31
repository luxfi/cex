import Document, {
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'

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

import Router from 'next/router'
import Error as NextError from 'next/error'

let dynamicRoutes = [
  'account',
  'article',
  'browse',
  'careers',
  'checkout',
  'confirmPayment',
  'film',
  'invite',
  'offering',
  'orderDetails',
  'orderDetails',
  'pickSeats',
  'pro',
  'ticketing',
  'trade',
  'watch',
]

function Error({ statusCode }) {
  // Route dynamic routes in devmode
  if (statusCode === 404) {
    let path = location.pathname.split('/')[1]
    if (dynamicRoutes.indexOf(path) !== -1) {
      Router.push('/'+path, location.pathname+location.search)
      return null
    }
  }

  return <NextError statusCode={statusCode} />
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error

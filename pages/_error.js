import Router from 'next/router'

let dynamicRoutes = [
  'article',
  'browse',
  'film',
  'offering',
  'pro',
  'trade',
  'ticketing',
  'checkout',
  'confirmPayment',
  'account',
  'pickSeats',
  'watch',
  'orderDetails',
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

  return (
    <>
      <h1>Error</h1>
      <p>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : 'An error occurred on client'}
      </p>
    </>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error

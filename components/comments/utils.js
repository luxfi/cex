export const isUserLoggedIn = (loggedIn, uri, router) => {
  if (!loggedIn) {
    const referrer = encodeURI(uri)
    router.push(`/login?ref=${referrer}`)
    return false
  }
  return true
}

export const noop = () => {}

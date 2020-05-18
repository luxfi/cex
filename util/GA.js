export const GA_TRACKING_ID = 'UA-151184093-1'

// Taken directly from Next.js' recommendations on how to to GA in a next app:
// https://github.com/zeit/next.js/tree/canary/examples/with-google-analytics

export const logPageView = (url) => {
  window.gtag('config', GA_TRACKING_ID, { page_path: url, })
}

export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}
export default (theme) => ({
  addToWatchlistButton: {
    display: 'inline-block',
    flexGrow: 1,
    marginLeft: '12px',
  },
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
})

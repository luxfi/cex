export default (theme) => ({
  root: {
    flexGrow: 1,
    margin: '70px 0 0 0',
  },

  leftSideWrapper: {
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    color: '#fff',
  },

  overlay: {
    background: 'rgba(0, 0, 0, 0.77)',
    position: 'absolute',
    display: 'flex',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    '& h2': {
      fontSize: '3em',
      color: '#FBC43E',
    },
    '& .subtitle': {
      fontSize: '1.5em',
    },
  },
})

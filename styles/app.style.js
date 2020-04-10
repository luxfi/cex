// https://philipwalton.github.io/solved-by-flexbox/demos/sticky-footer/
export default (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    overflowX: 'hidden',
    // Default Filled Input Changes
    '& .MuiInput-underline': {
      borderRadius: 4,
      backgroundColor: 'rgb(255,255,255,0.15)',
      '&:before': {
        content: 'none',
      },
      '&:after': {
        content: 'none',
      },
    },
  },
  header: {
    maxWidth: 1400,
  },
  main: {
    flexGrow: 1,
    maxWidth: 1400,
    padding: theme.spacing(0),
    paddingTop: theme.spacing(8),
    minHeight: '50vh',
    '& .slide-button': {
      margin: 0,
      background: 'transparent !important',
    },
    // TODO: Temp fix, needs to be done for all sliders
    '& .slider-wrapper': {
      width: '100%',
    },
  },

  discoverMain: {
    maxWidth: '100%',
    padding: theme.spacing(0),
  },

  fullWidth: {
    maxWidth: '100%',
  },

  footer: {
    maxWidth: 1400,
    padding: theme.spacing(2),
  },
  discoverFooter: {
    maxWidth: '100%',
    padding: theme.spacing(2),
  }
})

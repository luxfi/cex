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
  main: {
    flexGrow: 1,
    minHeight: '50vh',
    paddingTop: theme.spacing(8),
    // paddingBottom: theme.spacing(2),
    '& .slide-button': {
      margin: 0,
      background: 'transparent !important',
    },
    // TODO: Temp fix, needs to be done for all sliders
    '& .slider-wrapper': {
      width: '100%',
    },
  },
})

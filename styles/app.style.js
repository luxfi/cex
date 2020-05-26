// https://philipwalton.github.io/solved-by-flexbox/demos/sticky-footer/
export default (theme) => ({

  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    overflowX: 'hidden',
    padding: 0,
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

  footer: {
        /* padding and responsivity impl is in 'styles/responsivePadding.scss' */ 
    marginTop: theme.spacing(3)
  },

  main: {
        /* padding and responsivity impl is in 'styles/responsivePadding.scss' */ 

    '& .slide-button': {
      margin: 0,
      background: 'transparent !important',
    },
      // TODO: Temp fix, needs to be done for all sliders
    '& .slider-wrapper': {
      width: '100%',
    },

    flexGrow: 1,
    marginTop: '64px',
    minHeight: '50vh',
  },

})

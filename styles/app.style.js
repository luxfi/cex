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

  main: {
    flexGrow: 1,
    marginTop: '64px',

    padding: theme.spacing(0),

    [theme.breakpoints.down('xs')]: {
      padding: `0px ${theme.spacing(2)}`,
    },

    minHeight: '50vh',
    '& .slide-button': {
      margin: 0,
      background: 'transparent !important',
    },
    // TODO: Temp fix, needs to be done for all sliders
    '& .slider-wrapper': {
      width: '100%',
    },

    //backgroundColor: '#ccc', // TEMP
  },
  
  footer: {
    marginTop: theme.spacing(3),
  }, 

  fullScreenContainer: {
    maxWidth: 'none !important',
    marginTop: '0px',
  },

    // maxWidth is taken care of in definition
  container: {

    padding: `0px ${theme.spacing(3)}px`,

      // the "bump" edgecase :)
    ['@media (min-width:1280px) and (max-width:1400px) ']: {
      paddingLeft: 'calc(64px - (50% - 640px)) !important',
      paddingRight: 'calc(64px - (50% - 640px)) !important'
    },

    [theme.breakpoints.up('lg')]: {
      padding: 0, // float in space, so no need for
    },
       
    [theme.breakpoints.down('xs')]: {
      padding: `0px ${theme.spacing(2)}px`
    },
  },

})

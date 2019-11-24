export default theme => ({
  container: {
    zIndex: "12",
    color: theme.palette.common.white,
    marginTop: -64,
    height: '100%',
    '& > *': {
      height: '100%',
    },
    '& .carousel': {
      height: '100%',
    },
    '& .slider': {
      height: '100%',
    },
    '& .slider-wrapper': {
      height: '100%',
      padding: 0,
    },
    '& .logo': {
      maxHeight: 100,
      width: 'initial',
    },
  },
  gridContainer: {
    maxWidth: theme.breakpoints.lg,
    width: '100%',
    height: '100%',
    padding: `${theme.spacing(3)}px 0`,
    paddingBottom: 110,
    margin: '0 60px',
    [theme.breakpoints.up('xl')]: {
      maxWidth: 1800,
      margin: '0 auto',
    },
  },
  buttonGridContainer: {
    [theme.breakpoints.down('sm')]: {
      '& > *': {
        width: '100%',
      },
      '& button': {
        width: '100%',
      },
    },
  },
  investButton: {
    color: theme.palette.common.black,
    backgroundColor: "#FBC43E",
    padding: "12px 24px"
  },
  watchTrailerButton: {
    color: theme.palette.common.white,
    border: `1px solid ${theme.palette.common.white}`,
    padding: "11px 24px"
  },
  watchTrailerButtonText: {
    color: "inherit !important",
  }
})


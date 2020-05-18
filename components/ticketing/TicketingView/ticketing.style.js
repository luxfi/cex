const whiteColor = '#ffffff'
const buttons = {
  padding: '10px 20px',
  textTransform: 'capitalize',
  backgroundColor: '#333',
  borderColor: 'transparent',
  borderRadius: '4px',
  textAlign: 'left',
  '&:hover': {
    backgroundColor: 'black',
  },
}
const svgIcon = {
  width: '1rem',
  height: '1rem',
}

export default (theme) => ({
  movieSummaryHero: {
    padding: theme.spacing(2),
    borderRadius: '4px',
    backgroundColor: '#222',
    margin: '0 auto 0',
  },
  movieSummaryHeroTitle: {
    fontSize: '24px',
    fontWeight: 600,
    lineHeight: 1,
    marginBottom: '8px',
    marginTop: 0,
  
    [theme.breakpoints.up('md')]: {
      fontSize: '28px',
    }
  },
  whiteSvgIcon: {
    ...svgIcon,
    fill: whiteColor,
  },
  svgIcon: {
    ...svgIcon,
  },
  watchTrailerButton: {
    ...buttons,
  
    [theme.breakpoints.down(551)]: {
      width: '100%',
    }
  },
  bookmarkButton: {
    ...buttons,
    marginLeft: theme.spacing(2),
  
    [theme.breakpoints.down(551)]: {
      marginLeft: theme.spacing(0),
      marginTop: theme.spacing(2),
      width: '100%',
    }
  },
  outerContainer: {
    padding: theme.spacing(0),

    [theme.breakpoints.down('lg')]: {
      padding: theme.spacing(0, 3),
    }
  },
  movieSummaryHeroMetadata: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px',
    justifyContent: 'flex-start',

    [theme.breakpoints.up('md')]: {
      marginBottom: '16px',
    }
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: 'flex-start',

    [theme.breakpoints.down(551)]: {
      flexDirection: "column",
    }
  },
  movieSummaryHeroPoster: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  
    [theme.breakpoints.up('md')]: {
      flexDirection: "column",
      alignItems: "flex-start"
    }
  },
  heroImage: {
    width: '170px',
    height: '170px',
    objectFit: 'cover',
  },
  movieSummaryHeroInfo: {
    textAlign: 'left',

    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(1, 0),
    }
  },
  rRatedContainer: {
    fontSize: '12px',
    border: `1px solid ${whiteColor}`,
    borderRadius: '4px',
    padding: '0 1px',
    marginRight: '10px',
    color: whiteColor,
  },
  movieTimer: {
    marginRight: '5px',
  },
  movieSummaryHeroSynopsis: {
    marginBottom: '16px',
    maxWidth: '100%',
  
    [theme.breakpoints.up('md')]: {
      maxWidth: '700px',
    }
  },
  movieSummaryHeroInfoLink: {
    fontWeight: 600,
    whiteSpace: 'nowrap',
    color: '#00aeef',
    textDecoration: 'none',
    backgroundColor: 'transparent',
  },
  dateLocationStripe: {
    margin: '16px 0',
    padding: '16px',
    backgroundColor: '#222',
    position: 'relative',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'flex-start',

    [theme.breakpoints.down(795)]: {
      alignItems: "flex-start"
    }
  },
  findMovieHeaderSection: {
    [theme.breakpoints.down(795)]: {
      marginBottom: theme.spacing(2),
    }
  },
  buttonSection: {
    display: 'flex',
    justifyContent: 'justify-start',

    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
    },

    [theme.breakpoints.down(551)]: {
      flexDirection: "column",
      alignItems: "center",
      width: '100%',
    }
  },
  findMovieHeaderButton: {
    display: 'flex',

    [theme.breakpoints.down(551)]: {
      width: '100%',
      marginBottom: theme.spacing(2),
    }
  },
  dateLocationStripeHeading: {
    display: 'inline-block',
    verticalAlign: 'middle',
    marginRight: theme.spacing(2),
    fontWeight: 600,
    fontSize: '14px',
  },
  dateLocationStripeText: {
    display: 'inline-block',
    verticalAlign: 'middle',
    marginRight: '8px',
    fontSize: '16px',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  dateLocationStripeDropdown: {
    backgroundColor: whiteColor,
    textTransform: 'capitalize',
    padding: '2px 20px 2px 15px',
    color: '#000000',
    marginRight: '15px',
    '&:hover': {
      backgroundColor: whiteColor,
    },
    marginBottom: theme.spacing(0),

    [theme.breakpoints.down(551)]: {
      width: '100%',
      marginBottom: theme.spacing(2),
    }
  },
  notFoundSection: {
    padding: '16px',
    backgroundColor: '#222',
    textAlign: 'center',
  },
  movieVenue: {
    marginBottom: 24,
  },
  movieVenueIconContainer: {
    width: '64px',
    height: '64px',
    marginRight: '16px',
    verticalAlign: 'middle',
    display: "flex",
    flexDirection: "column",
    alignItems: "center"

  },
  movieVenueIcon: {
    width: '64px',
    height: '64px',
    backgroundColor: '#5a5a5a',
    borderRadius: '100%',
  },
  movieVenueTitle: {
    margin: 0,
  },
  movieVenueTitleLink: {
    color: '#00aeef',
    textDecoration: 'none',
    fontSize: '16px',

    [theme.breakpoints.up('md')]: {
      fontSize: '20px',
    }
  },
  venueName: {
    fontSize: '14px',

    [theme.breakpoints.up('md')]: {
      fontSize: '18px',
    }
  },
  movieVenueContainer: {
    padding: '16px 0',
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
  },
  panelBody: {
    padding: '16px',
    backgroundColor: '#222',
  },
  showtimeSchedules: {
    padding: '16px',
    backgroundColor: '#fac54c',
    display: 'flex',
    alignItems: 'flex-start',

    [theme.breakpoints.down(600)]: {
      alignItems: "center",
      justifyContent: 'center',
    }
  },
  formatContainer: {
    width: '30%',
    textAlign: 'left',
    marginBottom: theme.spacing(0),

    [theme.breakpoints.down(600)]: {
       width: '100%',
      textAlign: 'center',
      marginBottom: theme.spacing(2),
    }
  },
  btnShowtime: {
    position: 'relative',
    color: 'white',
    backgroundColor: '#222',
    border: '1px solid #FBC43E',
    borderRadius: '4px',
    padding: '5px 20px',
    marginLeft: '12px',
  },
  showtimeTitle: {
    fontSize: '18px',
    color: '#2d2d2d',
    fontWeight: 'bold',
  },
  datesList: {
    width: '100%',
    padding: '0 20px',
  },
  locationList: {
    width: '100%',
  },
  formatsList: {
    width: '100%',
    padding: '20px',
  },
})

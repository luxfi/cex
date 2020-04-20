import {
  flexCenteredColumn,
  flexCenteredRow,
  flexStartColumn,
} from '../../../styles/esxStyles'

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
    fontSize: '28px',
    fontWeight: 600,
    lineHeight: 1,
    marginBottom: '8px',
    marginTop: 0,
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      textAlign: 'left',
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
  
    [theme.breakpoints.down(424)]: {
      width: 165,
    }
  },
  bookmarkButton: {
    ...buttons,
    marginLeft: theme.spacing(2),
  
    [theme.breakpoints.down(424)]: {
      marginLeft: theme.spacing(0),
      marginTop: theme.spacing(2),
      width: 165,
    }
  },
  outerContainer: {
    padding: theme.spacing(0),

    [theme.breakpoints.down('lg')]: {
      padding: theme.spacing(0, 3),
    }
  },
  movieSummaryHeroMetadata: {
    marginBottom: '5px',
    justifyContent: 'center',

    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-start',
      marginBottom: '16px',
    }
  },
  buttonContainer: {
    justifyContent: 'center',

    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-start',
    },

    [theme.breakpoints.down(424)]: {
      ...flexCenteredColumn,
    }
  },
  movieSummaryHeroPoster: {
    ...flexCenteredRow,

    [theme.breakpoints.up('md')]: {
      ...flexStartColumn,
    }
  },
  heroImage: {
    width: '170px',
    height: '170px',
    objectFit: 'cover',
  },
  movieSummaryHeroInfo: {
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
    textAlign: 'center',
  
    [theme.breakpoints.up('md')]: {
      maxWidth: '700px',
      textAlign: 'left',
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
    textAlign: 'left',
    margin: '16px 0',
    padding: '16px',
    backgroundColor: '#222',
    position: 'relative',
    borderRadius: '4px',
  },
  dateLocationStripeHeading: {
    display: 'inline-block',
    verticalAlign: 'middle',
    marginRight: '6px',
    fontWeight: 600,
    fontSize: '14px',
  },
  dateLocationStripeText: {
    display: 'inline-block',
    verticalAlign: 'middle',
    marginRight: '8px',
    fontSize: '16px',
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
  },
  panelBody: {
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
    paddingRight: '16px',
    verticalAlign: 'middle',
    ...flexCenteredColumn,
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
    fontSize: '20px',
  },
  movieVenueContainer: {
    padding: '16px 0',
    ...flexStartColumn,
  },
  showtimeSchedules: {
    padding: '16px',
    backgroundColor: '#fac54c',
  },
  formatContainer: {
    width: '30%',
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
    minWidth: '360px',
    padding: '0 20px',
  },
  locationList: {
    width: '100%',
    minWidth: '360px',
  },
  formatsList: {
    width: '100%',
    minWidth: '360px',
    padding: '20px',
  },
})

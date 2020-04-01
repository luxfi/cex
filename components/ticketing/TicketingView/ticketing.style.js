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
    ...flexCenteredRow,
    alignItems: 'center',
    margin: '0 auto 0',
  },
  movieSummaryHeroTitle: {
    fontSize: '28px',
    fontWeight: 600,
    lineHeight: 1,
    marginBottom: '8px',
    marginTop: 0,
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
  },
  bookmarkButton: {
    ...buttons,
    marginLeft: '16px',
  },
  outerContainer: {
    padding: '0',
  },
  movieSummaryHeroMetadata: {
    marginBottom: '16px',
  },
  movieSummaryHeroPoster: {
    display: 'table-cell',
    position: 'relative',
  },
  heroImage: {
    width: '107px',
    height: '170px',
  },
  movieSummaryHeroInfo: {
    display: 'table-cell',
    width: '100%',
    verticalAlign: 'middle',
    paddingLeft: '24px',
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
    maxWidth: '700px',
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

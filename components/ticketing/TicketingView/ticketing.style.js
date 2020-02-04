import {
  container,
  title,
  flexCenteredRow,
  flexCenteredColumn,
} from "../../../styles/esxStyles.js"

const whiteColor = '#ffffff';
const buttons = {
  textTransform: 'capitalize',
  backgroundColor: '#0f1a21',
  borderColor: 'transparent',
  borderRadius: '4px',
  textAlign: 'left',
  '&:hover': {
    backgroundColor: '#090909',
  },
};
const svgIcon = {
  width: '1rem',
  height: '1rem',
}

export default theme => ({
  movieSummaryHero: {
    padding: '16px',
    borderRadius: '4px',
    backgroundColor: '#202b35',
    ...flexCenteredRow,
    alignItems: 'center',
    margin: '32px 0 0',
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
    ...buttons
  },
  bookmarkButton: {
    ...buttons,
    marginLeft: '16px',
  },
  outerContainer: {
    marginTop: '64px',
    padding: '0 32px',
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
    border: `1px solid ${whiteColor}`,
    borderRadius: '4px',
    padding: '2px',
    marginRight: '5px',
    color: whiteColor,
  },
  movieTimer: {
    marginRight: '5px'
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
    backgroundColor: '#202b35',
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
    padding: '16px 0',
    backgroundColor: '#0f1a21',
    textAlign: 'center',
  }
})



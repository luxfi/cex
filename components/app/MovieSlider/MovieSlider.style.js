import { relativeTimeRounding } from "moment"

const arrowDiameter = 46
const arrowOffset = `-${arrowDiameter/2}px` // relative to the track, NOT "outer"

export default (theme) => ({

  arrow: {
    display: 'block',
    position: 'absolute',
    color: theme.palette.text.primary,
    top: '50%',
    transform: 'translate(0, -50%)',
    cursor: 'pointer',
    width: `${arrowDiameter}px`,
    height: `${arrowDiameter}px`,
    zIndex: 100,
    borderRadius: '50%',
    border: '1px solid ' + theme.palette.background.paper,
    backgroundColor: theme.palette.background.paper,

    '&:hover': {
      backgroundColor: '#333',
      borderColor: '#333',
    },

    '& svg': {
      position: 'relative',
      width: '100%',
      height: '100%'
    },
  },

  previousArrow: {
    left: arrowOffset,
    '& svg': {
      left: '-1px',
    },

    '& .slick-disabled': {
      display: 'none',
    },
  },

  nextArrow: {
    right: arrowOffset,

    '& .slick-disabled': {
      display: 'none',
    },
  },

  outer: {
    position: 'relative',

      // to match header.style.js and other elements
    padding: `0px ${theme.spacing(3)}px`,
    [theme.breakpoints.down('xs')]: {
      padding: `0px ${theme.spacing(2)}px`,
    },
    [theme.breakpoints.up('lg')]: {
      padding: `0px ${theme.spacing(8)}px`,
    },

    // This allows room for the cards to expand on hover without getting clipped out by the parent div
    '& .slick-track': {
      padding: '25px 0px'
    },

    '& .slick-slide': {
      paddingRight: theme.spacing(1)
    },
  },

  title: {
    paddingLeft: theme.spacing(8),
    textTransform: 'upperCase',
    fontSize: '1.7rem',
  },

})

import autoprefixer from "autoprefixer"
import { relativeTimeRounding } from "moment"

const lowerGradientRGBString = '0, 0, 0'
//const hoverGradientRGBString = '176, 130, 19'
// const hoverGradientRGBString = '176, 145, 100'
const hoverGradientRGBString = '20, 20, 20'
// rgba(${hoverGradientRGBString}, 0.1) 100%, rgba(${hoverGradientRGBString}, 0.5) 95%,

export default (theme) => ({

  card: {
    position: 'relative',
    height: '100%',
    zIndex: 1,
    transition: 'transform 200ms ease 100ms',
    '&:hover': {
      zIndex: 10,
      transform: 'scale(1.10) !important',
    },
    '&:hover $cardContent': {
      background: `linear-gradient(to top,  rgba(${hoverGradientRGBString}, 1) 0%, rgba(${hoverGradientRGBString}, 0.7) 97%, rgba(${hoverGradientRGBString}, 0.5) 100%)`,
      height: '100%',
    },
    '&:hover $hoverContent': {
      display: 'flex',
    },
    '&:hover $standardContent': {
      display: 'none',
    },
    '&:hover $trailerImg': {
      display: 'block',
    },
  },

  aTag: {
    color: theme.palette.common.white,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },

  cardMedia: {
    objectFit: 'cover',
    height: '100%',
  },

  cardContent: {
    position: 'absolute',
    width: '100%',
    height: '20%',
    bottom: 0,
    padding: 0,
    background: `linear-gradient(to top,  rgba(${lowerGradientRGBString}, 0.9) 0%, rgba(${lowerGradientRGBString}, 0.3) 75%, rgba(${lowerGradientRGBString}, 0) 100%)`,
    transition: 'height 0.25s linear 0ms',
  },

  innerCardContent: {
    flexDirection: 'column',
    width: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    background: 'transparent',
    transition: 'background 0.25s linear 0ms',
  },

  standardContent: {
    display: 'flex',
  },

  hoverContent: {
    display: 'none',
  },

  title: {
    fontWeight: 'bold',
    fontSize: '1.1rem',
    color: theme.palette.common.white,
    marginBottom: theme.spacing(2),
    marginTop: 0,
  },

  shortDescription: {
    fontSize: '0.9rem',
    color: theme.palette.common.white,
    marginBottom: theme.spacing(2),
    marginTop: 0,
  },


  status: {
    fontWeight: 'bold',
    fontSize: '1.0rem',
    color: theme.palette.secondary.main,
    marginBottom: theme.spacing(1),
  },

  label: {
    color: theme.palette.common.white,
  },

  buttonsOuter: {
    width: '90%',
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-around',
  },

  hoverButton: {
    padding: 0,
    minWidth: '40px',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '1px solid ' + theme.palette.background.default,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.black,
  },

  textButton: {
    width: 'auto',
    borderRadius: '5px',
    padding: '5px 20px',
    fontWeight: 'bold',
  },

  trailerImg: {
    display: 'none',
    position: 'relative',

    '& svg': {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '50px !important',
      height: 'auto !important',
      transform: 'translate(-50%, -50%)',
      cursor: 'pointer',
      '&:hover': {
        width: '60px !important',
      },
    },

    '& img': {
      height: 'auto',
      width: '100%',
    },
  },
})

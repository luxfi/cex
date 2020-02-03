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
    //cursor: 'pointer',
    transition: 'transform 300ms ease 100ms',
    '&:hover': {
      zIndex: 10,
      transform: 'scale(1.05) !important',
    },
    '&:hover $cardContent': {
      background: `linear-gradient(to top,  rgba(${hoverGradientRGBString}, 1) 0%, rgba(${hoverGradientRGBString}, 0.7) 97%, rgba(${hoverGradientRGBString}, 0.5) 100%)`,
      height: '100%',
    },
    '&:hover $innerCardContent': {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    '&:hover $hoverContent': {
      visibility: 'visible'
    },
    '&:hover $standardContent': {
      visibility: 'hidden'
    },
    '&:hover $trailerImg': {
      visibility: 'visible'
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
//     height: '100%',
    bottom: 0,
    padding: 0,
    background: `linear-gradient(to top,  rgba(${lowerGradientRGBString}, 0.9) 0%, rgba(${lowerGradientRGBString}, 0.3) 75%, rgba(${lowerGradientRGBString}, 0) 100%)`,
    transition: 'height 0.25s linear 0ms',
  },

  innerCardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',

    width: '100%',
    padding: theme.spacing(2),
    background: 'transparent',
    transition: 'background 0.25s linear 0ms'
  },

  title: {
    fontWeight: 'bold',
    fontSize: '1.1rem',
    color: theme.palette.common.white,
    marginBottom: theme.spacing(2),
    marginTop: 0
  },

  hoverContent: {
    visibility: 'hidden'
  },

  standardContent: {
  },

  status: {
    fontWeight: 'bold',
    fontSize: '1.0rem',
    color: theme.palette.secondary.main,
    marginBottom: theme.spacing(1),
  },

  label: {
    color: theme.palette.common.white
  },

  buttonsOuter: {
    marginTop: theme.spacing(3),
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
    marginRight: theme.spacing(2),
  },

  trailerImg: {
    visibility: 'hidden',
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
      width: '100%'
    }
  }
})

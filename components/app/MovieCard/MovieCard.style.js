
const lowerGradientRGBString = '100, 100, 100'
//const hoverGradientRGBString = '176, 130, 19'
// const hoverGradientRGBString = '176, 145, 100'
const hoverGradientRGBString = '150, 150, 150'

// rgba(${hoverGradientRGBString}, 0.1) 100%, rgba(${hoverGradientRGBString}, 0.5) 95%,

export default (theme) => ({

  card: {
    position: 'relative',
    height: '100%',
    zIndex: 1,
    cursor: 'pointer',
    '&:hover': {
      zIndex: 10,
      transform: 'scale(1.05) !important',
    },
    '&:hover $cardContent': {
      background: `linear-gradient(to top,  rgba(${hoverGradientRGBString}, 1) 0%, rgba(${hoverGradientRGBString}, 0.7) 97%, rgba(${hoverGradientRGBString}, 0.5) 100%)`,
      height: '67%',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    transition: 'transform 300ms ease 100ms'
  },

  cardMedia: {
    objectFit: 'cover',
    height: '100%',
  },

  cardContent: {
    position: 'absolute',
    width: '100%',
    height: '33%',
    bottom: 0,
    background: `linear-gradient(to top,  rgba(${lowerGradientRGBString}, 0.9) 0%, rgba(${lowerGradientRGBString}, 0.3) 75%, rgba(${lowerGradientRGBString}, 0) 100%)`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    transition: 'height 0.25s linear 0ms'
  },

  stat: {
    fontWeight: 'bold',
    color: theme.palette.secondary.main
  }
})
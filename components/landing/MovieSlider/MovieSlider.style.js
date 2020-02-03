const arrowOffset = '-30px' // relative to the track, NOT "outer"

export default (theme) => ({

  arrow: {
    display: 'block',
    position: 'absolute',
    color: theme.palette.text.primary,
    top: '50%',
    transform: 'translate(0, -50%)',
    cursor: 'pointer',
    width: '30px',
    height: '80px',
    zIndex: 100,

    backgroundColor: theme.palette.background.default,

    '&:hover': {
      backgroundColor: theme.palette.background.paper,
      borderRadius: '5px',
      border: '1px solid ' + theme.palette.background.paper,
    },

    '& svg': {
      width: '100%',
      height: '100%'
    }
  },

  previousArrow: {
    left: arrowOffset,
  },

  nextArrow: {
    right: arrowOffset,
  },

  outer: {
    position: 'relative',
    padding: '0px 30px'
  }
})

export default (theme) => ({

  card: {
    position: 'relative',
    height: '100%',
    zIndex: 1,
    cursor: 'pointer',
    '&:hover': {
      zIndex: 10,
      transform: 'scale(1.1) !important',
    },
    '&:hover $cardContent': {
      visibility: 'visible',
    }
  },

  cardMedia: {
    objectFit: 'cover',
    height: '100%',
  },

  cardContent: {
    visibility: 'hidden',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    backgroundColor: theme.palette.background.paper,
    opacity: '0.8'
  },

  stat: {
    fontWeight: 'bold',
    color: theme.palette.secondary.main
  }
})
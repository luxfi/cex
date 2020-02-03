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
      background: 'linear-gradient(to top,  rgba(176, 130, 19, 1) 0%, rgba(176, 130, 19, 0.9) 70%, rgba(176, 130, 19, 0.5) 95%, rgba(176, 130, 19, 0.1) 100%)',
      height: '67%',
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
    height: '100%',
    bottom: 0,
    background: 'linear-gradient(to top,  rgba(100, 100, 100, 0.9) 0%, rgba(100, 100, 100, 0.3) 25%, rgba(100, 100, 100, 0) 100%)',
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
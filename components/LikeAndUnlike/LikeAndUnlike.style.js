export default (theme) => ({
  likeButton: {
    background: 'none',
    color: '#fff',
    '&:hover': {
      background: 'none',
    },
  },

  iconButton: {
    padding: 5,
    borderRadius: 8,
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },

  reacted: {
    color: theme.palette.secondary.main,
  },
})

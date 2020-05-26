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
      color: theme.palette.primary.main,
    },
  },

  reacted: {
    color: theme.palette.primary.main,
  },
})

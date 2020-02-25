const YELLOW = '#FBC43E'

const colorYellow = {
  color: YELLOW,
}

export default theme => ({
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
      ...colorYellow,
    },
  },

  reacted: {
    ...colorYellow,
  },
})

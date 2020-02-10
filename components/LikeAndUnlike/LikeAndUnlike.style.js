const YELLOW = '#FBC43E';

export default theme => ({
  likeButton: {
    background: 'none',
    color: '#fff',
    '&:hover': {
      background: 'none',
      color: YELLOW,
    }
  },

  iconButton: {
    padding: 5,
    borderRadius: 8,
    '&:hover': {
      color: YELLOW,
    }
  },


})



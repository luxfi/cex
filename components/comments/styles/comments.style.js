const YELLOW = '#FBC43E';

export default theme => ({
  commentHeader: {
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0',
    '& > *': {
      margin: '0 20px 0 0',
      fontSize: 14,
    }
  },

  loadingIcon: {
    margin: '20px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& svg': {
      color: YELLOW
    }
  },

  comment: {
    display: 'flex',
    margin: '0 0 10px 0',  
  },

  commentActions: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 10,
  },

  commentUserName: {
    fontSize: 14,
    fontWeight: 600,
  },

  commentImage: {
    margin: '0 10px 0 0',
    width: 50,
    height: 50,
  },

  addCommentInput: {
    padding: 10,
    fontSize: 14,
  },

  commentInputArea: {
    width: '100%',
    margin: '0 0 20px 0'
  },

  submitButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    '& > button': {
      margin: '10px 0 0 0',
    }
  },

  commentButton: {
    background: '#fff',
    '&:hover': {
      background: YELLOW,
    }
  },



})



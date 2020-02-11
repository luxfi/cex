export const dialogTitleStyles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: '#30363e',
    textAlign: 'center',
    color: theme.palette.white,
  },
  title: {
    fontSize: '16px',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.white,
  },
});


export const dialogContentStyles = theme => ({
  root: {
    padding: '20px',
    backgroundColor: '#202b35',
  },
})

export const dialogStyles = theme => ({
  dialogContainer: {
    lineHeight: '50px',
    backgroundColor: '#0f1a21',
    fontWeight: 600,
    textAlign: 'center',
    padding: '0 45px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  }
})

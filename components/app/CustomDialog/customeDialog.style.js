export const dialogTitleStyles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(4),
    backgroundColor: '#313131',
    textAlign: 'center',
    color: theme.palette.white,
  },
  title: {
    fontSize: '15px',
    position: 'absolute',
    left: theme.spacing(1),
    top: theme.spacing(1),
    padding: 12,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.white,
  },
})


export const dialogContentStyles = () => ({
  root: {
    padding: '20px',
    backgroundColor: '#222',
    minWidth: 300,
  },
})

export const dialogStyles = () => ({
  dialogContainer: {
    lineHeight: '50px',
    backgroundColor: '#0f1a21',
    fontWeight: 600,
    textAlign: 'center',
    padding: '0 45px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
})

export default (theme) => ({

  root: {
    padding: theme.spacing(2),

    '& .MuiCard-root': {
      '& h6': {
        fontSize: '1rem',
        marginBottom: theme.spacing(1.5),
      }
    },
    '& MuiFormControl-root': {
      display: 'block',
      width: '100%',
    },

    '& .MuiTextField-root': {
      width: '100%',
    },
  },

  profileViewSaveButton: {
    margin: '20px 0 0 0',
    padding: '10px 45px',
  },

  linkedAccountsCard: {
    marginBottom: theme.spacing(2)
  }


}) ////

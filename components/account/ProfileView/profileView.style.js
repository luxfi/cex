export default (theme) => ({

  root: {

      // each card
    '& .MuiPaper-root': {
      paddingTop: theme.spacing(1.5),
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

  mainButton: {
    margin: '20px 0 0 0',
    padding: '10px 45px',
  },

}) ////

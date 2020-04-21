export default (theme) => ({
  root: {

    '& MuiFormControl-root': {

      display: 'block',
      width: '100%',
      marginBottom: theme.spacing(2),

      '& .MuiTextField-root': {
        width: '100%',
      },
      '& .MuiInput-root': {
        padding: `0 ${theme.spacing(2)}`,
        marginRight: theme.spacing(2),
      },
      '& .MuiFormLabel-root': {
        margin: `0 ${theme.spacing(2)}`,
        color: theme.palette.text.secondary,
      },
      '& .MuiSvgIcon-root': {
        width: '0.8rem',
        height: '0.8rem',
      },
      '& .MuiIconButton-root': {
        padding: theme.spacing(1),
      },
      '& .MuiFormControlLabel-label': {
        fontSize: '1rem',
      },
          
    },

    '& MuiFormGroup-root': {
      marginTop: theme.spacing(2),
    },
  },

  mainButton: {
    margin: '20px 0 0 0',
    padding: '10px 45px',
  },
}) ////

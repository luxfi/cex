export default (theme) => ({
  innerContainer: {
    backgroundColor: '#222',
  },
  svgIcon: {
    width: '2rem',
    height: '2rem',
    marginRight: '10px',
    '&.selected': {
      fill: 'red',
    },
  },
  paymentMethodFields: {
    maxWidth: '80%',
    margin: '0 auto',
    textAlign: 'center',
  },
  formControl: {
    marginBottom: '18px',
    width: '100%',
    '& .MuiTextField-root': {
      width: '100%',
      '& .MuiOutlinedInput-root': {
        margin: '0 8px',
      },
      '& .MuiFormLabel-root': {
        margin: '0 8px',
      },
    },
  },
  toolTip: {
    fontSize: 14,
  },
  proceedButton: {
    color: theme.palette.common.black,
    fontWeight: 'bold',
    backgroundColor: '#FBC43E',
    padding: '10px 40px',
    marginTop: 10,
  },
})

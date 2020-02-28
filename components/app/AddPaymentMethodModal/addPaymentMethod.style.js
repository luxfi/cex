export default (theme) => ({
  innerContainer: {
    backgroundColor: '#222',
  },
  paymentIconContainer: {
    marginBottom: '2px',
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
  },
  proceedButton: {
    color: theme.palette.common.black,
    fontWeight: 'bold',
    backgroundColor: '#FBC43E',
    padding: '10px 40px',
    marginTop: 10,
  },
})

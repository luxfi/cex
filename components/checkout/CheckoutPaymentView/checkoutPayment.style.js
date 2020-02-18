export default (theme) => ({
  outerContainer: {
    position: 'relative',
    padding: '20px',
    backgroundColor: 'rgba(15,21,26,0.8)',
    boxShadow: 'none',
    margin: '52px auto 0',
    textAlign: 'center',
  },
  innerContainer: {
    padding: '20px',
    backgroundColor: '#222',
  },
  paymentIconContainer: {
    marginBottom: '2px',
  },
  svgIcon: {
    width: '2rem',
    height: '2rem',
    marginRight: '10px',
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
    backgroundColor: '#FBC43E',
    padding: '12px 24px',
  },
  creditCardIconContainer: {
    marginBottom: 10,
  },
})

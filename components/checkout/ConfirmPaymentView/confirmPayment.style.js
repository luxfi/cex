export default () => ({
  outerContainer: {
    margin: '52px auto 0',
    padding: '20px 32px',
    position: 'relative',
    backgroundColor: 'rgba(15,21,26,0.8)',
    flexGrow: 1,
  },
  ticketContainer: {
    width: '60%',
    padding: '0 20px',
  },
  movieImg: {
    width: '200px',
    height: '300px',
  },
  promoCodeContainer: {
    backgroundColor: '#222',
    padding: 12,
  },
  header: {
    fontSize: '18px',
    marginBottom: 10,
  },
  promoCodeInput: {
    marginRight: 10,
  },
  applyPromoBtn: {
    border: '1px solid #FBC43E',
    padding: '0 24px',
  },
  ticketOrderContainer: {
    margin: '18px 0',
  },
  table: {
    backgroundColor: '#222',
  },
  creditCardIcon: {
    width: 18,
    height: 18,
    marginRight: 5,
  },
  paymentMethodContainer: {
    backgroundColor: '#222',
    paddingBottom: 10,
  },
  editCardSection: {
    padding: '10px 12px',
    backgroundColor: '#222',
    color: 'rgba(255, 255, 255, 0.95)',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    '&.selected': {
      backgroundColor: '#4c4c4b',
    },
    '&:disabled': {
      backgroundColor: '#2d2c2c',
    },
  },
  link: {
    fontSize: 14,
    color: '#00b7ff',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  addPaymentSection: {
    padding: '10px 0',
  },
  buyBtn: {
    minWidth: '200px',
    height: '50px',
    marginLeft: '20px',
    fontSize: '20px',
    fontWeight: 700,
    backgroundColor: '#FBC43E',
    color: '#090909',
    '&:disabled': {
      color: '#676767',
      backgroundColor: '#bf9a40',
    },
  },
  subTotalContainer: {
    padding: '60px 20px',
  },
  subTotalText: {
    fontSize: '14px',
  },
  subTotal: {
    fontSize: '26px',
  },
})

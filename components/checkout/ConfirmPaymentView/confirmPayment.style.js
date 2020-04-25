export default (theme) => ({
  outerContainer: {
    width: '100%',
    backgroundColor: 'rgba(15,21,26,0.8)',
    padding: theme.spacing(2),
  },
  ticketContainer: {
    width: '100%',
    paddingLeft: theme.spacing(0),
    marginTop: theme.spacing(4),

    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(2),
      marginTop: theme.spacing(0),
    }
  },
  movieImg: {
    width: '100%',
    maxWidth: 317.5,
    height: 317.5,
  },
  accountNameContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  accountName: {
    fontSize: 14,
    marginLeft: 5,
  },
  accountBalanceContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  accountBalance: {
    fontSize: 14,
  },
  promoCodeContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',
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
    minWidth: 200,
    height: 50,
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 700,
    backgroundColor: '#FBC43E',
    color: '#090909',
    '&:disabled': {
      color: '#676767',
      backgroundColor: '#bf9a40',
    },
  },
  subTotalContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: theme.spacing(8, 0),
  },
  subTotalText: {
    fontSize: '14px',
  },
  subTotal: {
    fontSize: '26px',
  },
})

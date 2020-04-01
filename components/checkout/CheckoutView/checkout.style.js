export default () => ({
  outerContainer: {
    padding: '0',
  },
  innerContainer: {
    backgroundColor: '#0f151acc',
    padding: '20px',
  },
  ticketColumnHeader: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  ticketColumn: {
    fontSize: '16px',
  },
  ticketQuantityContainer: {
    width: '50%',
    padding: '0 20px',
  },
  tableHeader: {
    padding: '10px 20px',
    border: '1px solid rgba(255,255,255, 0.1)',
    marginRight: 2,
  },
  tableBody: {
    padding: '40px 20px',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    backgroundColor: '#222',
  },
  tableFooter: {
    padding: '20px',
    backgroundColor: '#222',
    marginRight: 1,
  },
  ticketBtn: {
    padding: 0,
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  addBtn: {
    border: '1px solid #FBC43E',
  },
  buttonIcon: {
    fill: '#FBC43E',
    width: '30px',
    height: '30px',
    pointerEvents: 'none',
  },
  ticketQuantity: {
    margin: '0 15px',
  },
  agePolicyLink: {
    color: '#00aeef',
    fontSize: '12px',
    display: 'inline-flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  agePolicyLinkIcon: {
    fill: '#00aeef',
    width: '16px',
    height: '16px',
    marginRight: '5px',
  },
  movieImg: {
    width: '200px',
    height: '300px',
  },
  nextButton: {
    minWidth: '200px',
    height: '50px',
    marginLeft: '20px',
    fontSize: '20px',
    fontWeight: 700,
    backgroundColor: '#FBC43E',
    color: '#090909',
    '&:disabled': {
      backgroundColor: '#777777',
      color: '#4a4a4a',
    },
  },
  subTotalContainer: {
    padding: '60px 20px',
  },
  subTotalText: {
    fontSize: '16px',
  },
  subTotal: {
    fontSize: '26px',
  },
})

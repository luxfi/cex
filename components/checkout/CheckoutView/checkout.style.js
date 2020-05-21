export default (theme) => ({
  outerContainer: {
    backgroundColor: '#0f151acc',
  },
  innerContainer: {
    padding: theme.spacing(2),
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    textAlign: 'center',
    flexDirection: 'column',
    
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      textAlign: 'left',
    },
  },
  aTag: {
    textDecoration: 'none',
  },
  ticketColumnHeader: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  ticketColumn: {
    fontSize: '16px',
  },
  movieInfoContainer: {
    paddingRight: theme.spacing(0),
    marginBottom: theme.spacing(4),

    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(2),
      marginBottom: theme.spacing(0),
    },
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
  manageQuantitySection: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  tableFooter: {
    padding: '20px',
    backgroundColor: '#222',
    marginRight: 1,
    textAlign: 'left',
  },
  ticketBtn: {
    padding: theme.spacing(0),
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
    width: '100%',
    maxWidth: 317.5,
    height: 317.5,
  },
  nextButton: {
    minWidth: '200px',
    height: '50px',
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
    padding: theme.spacing(8, 2),
    display: 'flex',
    justifyContent: 'flex-end',
  },
  subTotalText: {
    fontSize: '16px',
  },
  subTotal: {
    fontSize: '26px',
  },
})

export default (theme) => ({
  outerContainer: {
    marginTop: '64px',
    padding: theme.spacing(2),
    backgroundColor: '#0f151acc',
  },
  seatsSection: {
    width: '80%',
  },
  formatSection: {
    width: '20%',
  },
  seatsContainer: {
    backgroundColor: '#202b35',
    maxHeight: 450,
    overflow: 'scroll',
  },
  seatsTimerContainer: {
    padding: '0 0 10px',
    fontWeight: 'bold',
  },
  seatLegend: {
    display: 'flex',
    marginBottom: theme.spacing(1),
  },
  seatLegendbtn: {
    color: '#00b7ff',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    fontWeight: 'bold',
    fontSize: 14,
    padding: 0,
  },
  seatLegendIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  screenHeader: {
    width: '100%',
    padding: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  formatHeader: {
    padding: '0 20px',
    fontSize: 12,
    fontWeight: 'bold',
  },
  screenSection: {
    padding: 10,
  },
  seatColumn: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
  seats: {
    width: 40,
    height: 40,
    margin: theme.spacing(2, 0),

    [theme.breakpoints.down('sm')]: {
      width: 20,
      height: 20,
    }
  },
  seatImage: {
    width: 30,
    height: 30,
    cursor: 'pointer',

    [theme.breakpoints.down('sm')]: {
      width: 20,
      height: 20,
    }
  },
  btnList: {
    maxHeight: 450,
    overflow: 'scroll',
    display: 'flex',
    flexDirection: 'column',
  },
  movieTimeBtn: {
    margin: '8px 0 0',
  },
  selectedBtn: {
    border: '1px solid #FBC43E',
  },
  subHeader: {
    fontSize: 12,

    [theme.breakpoints.down('sm')]: {
      fontSize: 10,
    }
  },
  selectedSeats: {
    fontSize: 20,

    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    }
  },
  subTotal: {
    fontSize: 20,

    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    }
  },
  nextButtonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  nextButton: {
    padding: theme.spacing(1, 8),
    fontWeight: 700,
    backgroundColor: '#FBC43E',
    color: '#090909',
    '&:disabled': {
      backgroundColor: '#777777',
      color: '#4a4a4a',
    },

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1, 4),
    }
  },
  okButton: {
    fontWeight: 700,
    padding: '10px 40px',
    backgroundColor: '#FFFFFF',
    color: '#090909',
    marginTop: 15,
  },
})

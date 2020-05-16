import { red, green } from '@material-ui/core/colors'
import { headerHeight } from './const.js'

// TODO:  this is a fucking mess! :aa May 16th 2020
export default (theme) => ({

  coloredLink: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },

  proTrader: {
    height: `calc(100vh - ${headerHeight}px)`,

    padding: `0px ${theme.spacing(3)}`,
  
    [theme.breakpoints.up('lg')]: {
      padding: `0px ${theme.spacing(8)}`,
    },

    marginTop: theme.spacing(8),
    // fonts
    '& *': {
      fontSize: '.7rem',
    },
    // labels
    '& .MuiInputLabel-root': {
      fontSize: 'calc(.7rem / .75)',
      fontWeight: 600,
      textTransform: 'uppercase',
      color: theme.palette.common.white,
    },
    // inputs
    '& .MuiInput-root': {
      padding: '3px 12px',
    },
    '& .MuiSelect-icon': {
      top: 'calc(50% - 6px)',
      right: 8,
    },
    '& > div': {
      background: 'linear-gradient(to bottom, rgba(26,26,26,1) 0%,rgba(9,9,9,1) 100%)',

    }
  },
  tickerLabel: {
    color: 'rgba(255,255,255,.5)',
  },
  tickerNumber: {
    textTransform: 'uppercase',
    fontWeight: 600,
  },
  proTraderLabel: {
    textTransform: 'uppercase',
    fontWeight: 600,
  },
  orderBookArea: {
    width: 280,
    height: '100%',
    overflow: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: 'auto',
    },
  },
  orderBookPaper: {
    border: '1px solid',
    borderColor: theme.palette.background.paper,
    backgroundColor: theme.palette.background.default,
    height: '100%',
    overflow: 'hidden',
    '& span': {
      fontWeight: 600,
    },
  },
  tradeHistoryArea: {
    width: 480,
    height: '100%',
    overflow: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
      height: 'auto',
    },
  },
  tradeHistoryBookPaper: {
    // extend: 'orderBookPaper',
    borderLeft: 0,
    border: '1px solid',
    height: '100%',
    overflow: 'hidden',
    borderColor: theme.palette.background.paper,
    backgroundColor: theme.palette.background.default,
    '& span': {
      fontWeight: 600,
    },
  },
  exchangeHistoryArea: {
    height: '100%',
    overflow: 'auto',
    [theme.breakpoints.down('sm')]: {
      height: '50vh',
      overflow: 'unset',
    },
  },
  exchangeHistoryBookPaper: {
    // extend: 'orderBookPaper',
    borderLeft: 0,
    border: '1px solid',
    height: '100%',
    overflow: 'hidden',
    borderColor: theme.palette.background.paper,
    backgroundColor: theme.palette.background.default,
    '& span': {
      fontWeight: 600,
    },
  },
  proChart: {
    '& tspan': {
      fill: '#FFFFFF',
    },
  },
  tradePaper: {
    height: '100%',
  },
  tabsPaper: {
    height: '100%',
  },
  tabs: {
    height: '100%',
    '& > *': {
      height: '100%',
      '& > :first-child': {
        height: '100%',
      },
      '& > :last-child': {
        top: 0,
      },
    },
  },
  tab: {
    height: '100%',
    fontSize: '1.25rem',
    border: '1px solid',
    borderColor: theme.palette.background.paper,
    backgroundColor: theme.palette.background.default,
    width: '50%',
    minWidth: 0,
    textTransform: 'uppercase',
    fontWeight: 600,
    '&.Mui-selected': {
      backgroundColor: theme.palette.background.paper,
    },
  },
  bordered: {
    border: '1px solid',
    borderColor: theme.palette.background.paper,
    borderLeft: '0',
  },
  buyButton: {
    backgroundColor: green[500],
    color: theme.palette.common.white,
  },
  sellButton: {
    backgroundColor: red[500],
    color: theme.palette.common.white,
  },
  noMaxWidth: {
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100% !important',
    },
  },
  autoHeight: {
    [theme.breakpoints.down('sm')]: {
      height: '100% !important',
    },
  },
})

import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  reviewButton: {
    color: '#000',
    backgroundColor: '#FBC43E',
    padding: '12px 24px',
  },
  reviewButtonText: {
    color: '#000',
  },
  backButton: {
    color: 'transparent',
    border: '1px solid #FBC43E',
    padding: '11px 24px',
  },
  backButtonText: {
    color: '#FBC43E',
  },
  label: {
    textTransform: 'capitalize',
  },
  tabs: {
    height: '70px',
    '& > *': {
      height: '70px',
      '& > :first-child': {
        height: '70px',
      },
      '& > :last-child': {
        top: 0,
      },
    },
  },
  tab: {
    height: '100%',
    fontSize: '1.25rem',
    // border: '1px solid',
    // borderColor: theme.palette.background.paper,
    backgroundColor: theme.palette.background.default,
    width: '50%',
    minWidth: 0,
    '&.Mui-selected': {
      backgroundColor: theme.palette.background.paper,
    },
  },
}))
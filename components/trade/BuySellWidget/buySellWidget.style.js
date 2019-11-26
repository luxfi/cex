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
}))
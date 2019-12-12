import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  container: {
    width: '291px',
  },
  paper: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(7),
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
  },
  divider: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  investButton: {
    textTransform: 'none',
    backgroundColor: '#FBC43E',
    padding: `${theme.spacing(1.5)}px ${theme.spacing(3)}px`,
    marginTop: theme.spacing(0.5),
  },
  investButtonText: {
    color: '#000',
    fontSize: 16,
  },
  // leaving this here if we decide to do back button
  // backButton: {
  //   color: 'transparent',
  //   border: '1px solid #FBC43E',
  //   padding: '11px 24px',
  // },
  // backButtonText: {
  //   color: '#FBC43E',
  // },
}))
